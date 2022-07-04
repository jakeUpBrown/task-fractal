import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProjectList.css'

const ProjectRow = ({
    id,
    isCompleted,
    name,
    updateProjectCompleted,
}) => {

  return (
        <div className='project-row-container'>
        <div 
            className='project-row-item'
            onClick={(e) => updateProjectCompleted(e, id, !isCompleted)}
        >
            {isCompleted ? 'X' : 'O'}
        </div>
        <Link 
            className='project-link project-row-item'
            to={`/project/${id}`} 
        >
            {name}
        </Link>
        </div>
  )
}
export default React.memo(ProjectRow);