import React from 'react'
import { Link } from 'react-router-dom'
import '../Project.css'
import './ProjectTitle.css'

const ProjectTitle = ({
    taskPath,
    project,
    parentTaskId,
    subTasks,
}) => {
    const projectId = project.projectId;
    const taskPathLinks = []
    if (!parentTaskId) {
        taskPathLinks.push(
            <span
                key='task-path-link-root'
                className='task-path-link current-task-path'
            >
                {project.name}
            </span>
        )
    } else {
        taskPathLinks.push(
            <Link
                to={`/project/${projectId}`}
                className='task-path-link'
            >
                {project.name}
            </Link>
        )
        if (taskPath && taskPath.length > 0) {
            // get name
            taskPath.forEach((taskId) => {
                taskPathLinks.push(
                    <Link
                        to={`/project/${projectId}?parentTaskId=${taskId}`}
                        className='task-path-link'
                        key={`task-path-link-${taskId}`}
                    >
                        {subTasks[taskId].title}
                    </Link>)

            })
        }
        taskPathLinks.push(
            <span
                key={`task-path-link-${parentTaskId}`}
                className='task-path-link current-task-path'
            >
                {subTasks[parentTaskId].title}
            </span>)
    }

    return (
        <header className="project-header">
            <div>
                <div>
                    {taskPathLinks}
                </div>
                <div className="project-header-settings">
                    <button>
                        Settings
                    </button>
                </div>
            </div>
        </header>
    )
}
export default ProjectTitle;