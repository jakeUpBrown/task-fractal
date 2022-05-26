import React from 'react'
import './Project.css'
import tasks from '../../resources/tasks.json'
import project from '../../resources/project.json'
import HorizontalScroll from './HorizontalScroll/HorizontalScroll'

const Project = () => {
  // traverse the projects class and add a section for each sectionName value in array
  // have project header

  const { 
    name: projectName,
    subTasks,
  } = project

  const numSections = Math.max(...Object.values(subTasks).map(o => o.sectionIdx)) + 1

  const sectionTasks = Array.from(Array(numSections), () => Array(0))
  // for each section, create a Section Component and add to the page
  Object.entries(subTasks).forEach(element => {
    const taskId = element[0]
    const obj = element[1]

    const {
      sectionIdx,
    } = obj

    sectionTasks[sectionIdx].push({
      ...obj,
      taskId,
    });
  });

  console.log(sectionTasks);



  return (
    <div className="container2">

      <div className="projectHeader">
        <div className="projectName">
          {projectName}
        </div>
      </div>

      <div className='subTaskContainer'>
        <HorizontalScroll />
      </div>
    </div>
  )
}
export default Project;