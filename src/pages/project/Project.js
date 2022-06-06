import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import './Project.css'
import subTasks from '../../resources/tasks.json'
import project from '../../resources/project.json'
import HorizontalScroll from './HorizontalScroll/HorizontalScroll'
import ProjectTitle from './ProjectTitle/ProjectTitle';

// Finds path of taskId to parentTaskId
const findPath = (ob, key) => {
  const path = [];
  const keyExists = (obj) => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    }
    if (obj.hasOwnProperty(key)) {
      return true;
    }
    const subTaskTree = obj.subTaskTree;
    if (!subTaskTree) {
      return false;
    }
    if (subTaskTree && subTaskTree.hasOwnProperty(key)) {
      return true;
    }

    // get subTaskTree and search all of the id's.
    for (const k in subTaskTree) {
      path.push(k);
      const result = keyExists(subTaskTree[k], key);
      if (result) {
        return result;
      }
    }

    return false;
  };

  keyExists(ob);
  return path;
}

const Project = () => {

  // traverse the projects class and add a section for each sectionName value in array
  // have project header
  let [searchParams] = useSearchParams();
  const parentTaskId = searchParams.get('parentTaskId')
  const {
    projectId,
  } = useParams();

  const taskPath = (parentTaskId && parentTaskId !== projectId) ? findPath(project, parentTaskId) : undefined;

  const {
    subTaskTree,
    sectionNames,
  } = project

  let currentSectionNames = sectionNames;
  let currentSubTaskTree = subTaskTree;
  if (parentTaskId) {
    taskPath.forEach((taskId) => {
      currentSubTaskTree = currentSubTaskTree[taskId].subTaskTree
    })
    currentSectionNames = currentSubTaskTree[parentTaskId].sectionNames;
    currentSubTaskTree = currentSubTaskTree[parentTaskId].subTaskTree
    // traverse path using taskPath and replace
  }

  // TODO: add structure to pull project.json and tasks.json info from path params project 
  // TODO: change the context to be the parentTaskId param as the parent task
  return (
    <div className="container2">
      <ProjectTitle taskPath={taskPath} project={project} parentTaskId={parentTaskId} subTasks={subTasks}/>
      <div className='subTaskContainer'>
        <HorizontalScroll subTaskTree={currentSubTaskTree} subTasks={subTasks} sectionNames={currentSectionNames} />
      </div>
    </div>
  )
}
export default Project;