import React from 'react'
import './Project.css'
import tasks from '../../resources/tasks.json'
import project from '../../resources/project.json'

const Section = ({
    sectionName,
    subTasks,
}) => {
    
    // get all the subtasks to display and create

  return (
    <div className="sectionContainer">

      <div className="sectionHeader">
        {sectionName}
      </div>

      <div className='subTaskContainer'>
        
      </div>
    </div>
  )
}
export default Section;