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
  const [showCompleted, setShowCompleted] = useState();

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
    numSections,
  } = project

  let currentSectionNames = sectionNames;
  let currentNumSections = numSections;
  let currentSubTaskTree = subTaskTree;
  if (parentTaskId) {
    console.log('taskPath', taskPath)
    // TODO need to do more digging to find currentSubTaskTree
    taskPath.forEach((taskId) => {
      currentSubTaskTree = currentSubTaskTree[taskId].subTaskTree
    })
    currentSectionNames = currentSubTaskTree[parentTaskId].sectionNames
    currentNumSections = currentSubTaskTree[parentTaskId].numSections
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

  const createTask = ({
    newTask,
    taskPath,
    parentTaskId,
    sectionIdx,
    idx,
  }) => {
    const {
      taskId,
    } = newTask

    const {
      type,
      subType,
    } = project

    // load new task with project defaults. any default will be overwritten if included in the newTask obj
    const newTaskWithProjectDefaults =
    {
      projectId,
      type,
      subType,
      isCompleted: false,
      ...newTask,
    }

    // find the currentSubTaskTree using taskPath and parentTaskId
    // add task to subtasktree, increment any tasks with sectionIdx === currentSectionIdx and idx >= newIdx
    var newSubTaskTree = {}
    Object.assign(newSubTaskTree, subTaskTree)
    var currentObj = newSubTaskTree

    if (taskPath) {
      taskPath.forEach(tid => { currentObj = currentObj[tid].subTaskTree })
    }
    if (parentTaskId) {
      // get the object that's holding the sectionNames
      if (!(subTaskTree in currentObj[parentTaskId])) {
        currentObj[parentTaskId].subTaskTree = {}
      }
      currentObj = currentObj[parentTaskId].subTaskTree
    }
    // currentObj should hold the subTaskTree that needs editing
    // go through each entry and if entry.sectionIdx = sectionIdx && entry.idx >= idx, then increment idx

    Object.values(currentObj).forEach(t => {
      const {
        idx: tIdx,
        sectionIdx: tSectionIdx,
      } = t
      console.log('tIdx, tSectionIdx', tIdx, tSectionIdx)
      if (tSectionIdx === sectionIdx && tIdx >= idx) {
        console.log('found idx to increment')
        t.idx = tIdx + 1
      }
    })

    // add subTask obj under the current id
    currentObj[taskId] = {
      idx,
      sectionIdx,
    }

    console.log('old subTaskTree', subTaskTree)
    console.log('new subTaskTree', newSubTaskTree)
    console.log('currentObj', currentObj)

    // add newTask to subTasks
    const newSubTasks = {
      ...subTasks,
      [taskId]: { ...newTaskWithProjectDefaults }
    }
    setSubTasks(newSubTasks)
    setProject({
      ...project,
      subTaskTree: newSubTaskTree,
    })
    axios.post(
      'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/createtaskforproject',
      {
        task: newTaskWithProjectDefaults,
        projectId,
        subTaskTree: newSubTaskTree,
      }
    ).then(result => {
      console.log('task created successfully: ', result);
    }).catch(err => {
      console.log(err)
      setError(err.message);
    })

  }

  return (
    <div className="container2">
      <Attachments projectId={projectId} />
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
          numSections={currentNumSections}
          updateTaskCompleted={updateTaskCompleted}
          updateTaskInfo={updateTaskInfo}
          updateProjectInfo={updateProjectInfo}
          createTask={createTask}
        />
      </div>
    </div>
  )
}
export default Project;