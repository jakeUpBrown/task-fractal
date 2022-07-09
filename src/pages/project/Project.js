import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import './Project.css'
import { taskArrayToMap } from '../../Utils/SubtaskHelper';
import HorizontalScroll from './HorizontalScroll/HorizontalScroll'
import ProjectTitle from './ProjectTitle/ProjectTitle';
import axios from "axios";
import Attachments from './Attachments/Attachments';
import { findPath } from '../../Utils/idUtils';

const Project = () => {

  // traverse the projects class and add a section for each sectionName value in array
  // have project header
  let [searchParams] = useSearchParams();
  const parentTaskId = searchParams.get('parentTaskId')
  const {
    projectId,
  } = useParams();

  const [project, setProject] = useState();
  const [subTasks, setSubTasks] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log('useEffect project', project);
    if (!!project) {
      console.log('already loaded project');
      return;
    }
    async function readProject() {
      axios.post(
        'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/readproject',
        { projectId: projectId }
      ).then(result => {
        console.log('got result: ', result);
        setProject(result.data);
      })
    }
    readProject();
  }, [projectId, project]);

  useEffect(() => {
    console.log('useEffect subTasks', subTasks);
    if (!!subTasks) {
      console.log('already loaded subTasks');
      return;
    }
    async function readTasksByProjectId() {
      axios.post(
        'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/readtasksbyprojectid',
        { projectId: projectId }
      ).then(result => {
        console.log('got result: ', result);
        const subTaskMap = taskArrayToMap(result.data);
        console.log('subTaskMap', subTaskMap)
        setSubTasks(subTaskMap);
      })
    }
    readTasksByProjectId();
  }, [subTasks, projectId]);

  if (!!!project || !!!subTasks) {
    return <div> Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  const taskPath = (parentTaskId && parentTaskId !== projectId) ? findPath(project.subTaskTree, parentTaskId) : undefined;

  const {
    subTaskTree,
    sectionNames,
  } = project

  let currentSectionNames = sectionNames;
  let currentSubTaskTree = subTaskTree;
  if (parentTaskId) {
    console.log('taskPath', taskPath)
    // TODO need to do more digging to find currentSubTaskTree
    taskPath.forEach((taskId) => {
      currentSubTaskTree = currentSubTaskTree[taskId].subTaskTree
    })
    currentSectionNames = currentSubTaskTree[parentTaskId].sectionNames;
    currentSubTaskTree = currentSubTaskTree[parentTaskId].subTaskTree
    // traverse path using taskPath and replace
  }

  const updateTaskCompleted = (e, taskId, isCompleted) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('task completed clicked', project, isCompleted)
    console.log('subtasks', subTasks)
    var newTasks = {};
    Object.assign(newTasks, subTasks)
    var updatedTask = {};
    Object.assign(updatedTask, subTasks[taskId])
    updatedTask.isCompleted = isCompleted
    newTasks[taskId] = updatedTask

    setSubTasks(newTasks)
    // call updateProjectCompleted API
    axios.post(
      'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/updatetaskcompleted',
      {
        projectId,
        taskId,
        isCompleted,
      }
    ).then(result => {
      console.log('tasks updated successfully: ', result);
    }).catch(err => {
      console.log(err)
      setError(err.message);
    })
  }

  const updateProjectInfo = (newValues) => {
    console.log('update project info', newValues)
    var newProject = {};
    Object.assign(newProject, project)
    newProject = {
      ...newProject,
      ...newValues,
    }

    setProject(newProject)
    axios.post(
      'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/updateprojectinfo',
      {
        projectId,
        ...newValues,
      }
    ).then(result => {
      console.log('project updated successfully: ', result);
    }).catch(err => {
      console.log(err)
      setError(err.message);
    })
  }

  const updateTaskInfo = (taskId, newValues) => {
    console.log('update task values', newValues)
    var newSubTask = {};
    Object.assign(newSubTask, subTasks[taskId])
    newSubTask = {
      ...newSubTask,
      ...newValues,
    }

    var newSubTasks = {};
    Object.assign(newSubTasks, subTasks)
    newSubTasks[taskId] = newSubTask

    setSubTasks(newSubTasks)
    axios.post(
      'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/updatetaskinfo',
      {
        projectId,
        taskId,
        ...newValues,
      }
    ).then(result => {
      console.log('task updated successfully: ', result);
    }).catch(err => {
      console.log(err)
      setError(err.message);
    })
  }

  // TODO: add structure to pull project.json and tasks.json info from path params project 
  // TODO: change the context to be the parentTaskId param as the parent task
  return (
    <div className="container2">
      <ProjectTitle
        taskPath={taskPath}
        project={project}
        parentTaskId={parentTaskId}
        subTasks={subTasks}
        updateProjectInfo={updateProjectInfo}
        updateTaskInfo={updateTaskInfo}
      />
      <div className='subTaskContainer'>
        <HorizontalScroll
          project={project}
          taskPath={taskPath}
          parentTaskId={parentTaskId}
          subTaskTree={currentSubTaskTree}
          subTasks={subTasks}
          sectionNames={currentSectionNames}
          updateTaskCompleted={updateTaskCompleted}
          updateTaskInfo={updateTaskInfo}
          updateProjectInfo={updateProjectInfo}
        />
      </div>
      <Attachments projectId={projectId} />
    </div>
  )
}
export default Project;