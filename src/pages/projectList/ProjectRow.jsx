import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectList.css'

const ProjectRow = ({
    id,
    isCompleted,
    title,
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
                {title}
            </Link>
        </div>
    )
}
export default React.memo(ProjectRow);