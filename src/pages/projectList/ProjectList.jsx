import React from 'react'
import { Link } from 'react-router-dom'
import projects from '../../resources/projects.json'
import './ProjectList.css'

const ProjectList = () => {
  return (
    <div className="project-list-container">
    
    {projects.map(project => {
        return (
            <Link to={`/project/${project.projectId}`} >
                {project.name}
            </Link>
        )
    })}
    
  </div>
  )
}
export default ProjectList;