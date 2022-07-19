import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import OptionsButton from '../../../Components/Icons/OptionsButton/OptionsButton'
import Pencil from '../../../Components/Icons/Pencil'
import '../Project.css'
import ProjectOptions from './ProjectOptions/ProjectOptions'
import './ProjectTitle.css'

const ProjectTitle = ({
    parentTaskId,
    taskPath,
    project,
    subTasks,
    updateProjectInfo,
    updateTaskInfo,
    deleteProject,
}) => {

    const description = parentTaskId ? subTasks[parentTaskId].description : project.description
    const title = parentTaskId ? subTasks[parentTaskId].title : project.title
    const projectId = project.id
    const taskPathLinks = []
    if (!parentTaskId) {
        taskPathLinks.push(
            <span
                key='task-path-link-root'
                className='task-path-link current-task-path'
            >
                {title}
            </span>
        )
    } else {
        taskPathLinks.push(
            <Link
                to={`/project/${projectId}`}
                className='task-path-link'
                key={'task-path-link-root'}
            >
                {project.title}
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
                {title}
            </span>)
    }

    const [isEditable, setIsEditable] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [showEditTitleButton, setShowEditTitleButton] = useState(false)

    useEffect(() => {
        setIsEditable(false)
        setNewTitle(title)
        setNewDescription(description)
    }, [parentTaskId, title, description])

    const newTitleChanged = (e) => {
        const { value } = e.target
        setNewTitle(value)
    }

    const newDescriptionChanged = (e) => {
        const { value } = e.target
        setNewDescription(value)
    }

    const saveClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const updateObj = {}
        if (newTitle !== title) {
            updateObj['title'] = newTitle;
        }
        if (newDescription !== description) {
            updateObj['description'] = newDescription;
        }
        if (Object.keys(updateObj).length > 0) {
            if (!parentTaskId) {
                updateProjectInfo(updateObj)
            } else {
                updateTaskInfo(parentTaskId, updateObj)
            }
        }
        setIsEditable(!isEditable)
    }

    const toggleIsEditable = () => {
        setIsEditable(!isEditable)
    }

    return (
        <header className="project-header">
            <div
                onMouseEnter={() => { setShowEditTitleButton(true) }}
                onMouseLeave={() => { setShowEditTitleButton(false) }}

            >
                {
                    isEditable ?
                        (
                            <div className='edit-project-info-container'>
                                <input
                                    type="text"
                                    name="newTitle"
                                    value={newTitle}
                                    className="edit-project-title"
                                    onChange={newTitleChanged}
                                />
                                <textarea
                                    type="text"
                                    name="newDescription"
                                    value={newDescription}
                                    className="edit-project-description"
                                    onChange={newDescriptionChanged}
                                />
                            </div>
                        ) :
                        (
                            <div>
                                {taskPathLinks}
                                <div className='project-description-container'>
                                    {description}
                                </div>
                            </div>
                        )
                }
                <div className="project-header-settings">
                    {
                        isEditable ? (<div onClick={saveClicked}>✓</div>)
                            : showEditTitleButton ?
                                (<ProjectOptions
                                    toggleIsEditable={toggleIsEditable}
                                    deleteProject={deleteProject}
                                />)
                                : null
                    }
                </div>
            </div>
        </header>
    )
}
export default ProjectTitle;