import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../pages/project/Project.css'
import AddButton from '../Icons/AddButton'
import Pencil from '../Icons/Pencil'
import AddSubtaskModal from '../Modals/AddSubtask/AddSubtaskModal'
import './Subtask.css'

const Subtask = ({
    taskId,
    subTaskTree,
    sectionNames,
    isSubtask = false,
    isParentCompleted = false,
    updateTaskCompleted,
    updateTaskInfo,
    subTasks,
    taskPath,
    parentTaskId,
    sectionIdx,
    idx,
    createTask,
}) => {

    const {
        title,
        description,
        isCompleted,
    } = subTasks[taskId];

    const [expanded, setExpanded] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [isHover, setIsHover] = useState(false)

    const {
        projectId,
      } = useParams();

    const subTaskCount = subTaskTree ? Object.keys(subTaskTree).length : 0;

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (subTaskCount === 0) return;
        setExpanded(!expanded);
    }

    const onCompletedCheckboxClicked = (e) => {
        if (isParentCompleted) {
            console.log('ignoring task completed click since a parent task is completed')
            e.preventDefault()
            e.stopPropagation()
            return
        }
        e.stopPropagation();
        e.preventDefault();
        console.log('checkbox clicked, ')
        const newIsCompletedValue = !(isParentCompleted || isCompleted)
        updateTaskCompleted(e, taskId, newIsCompletedValue)
    }

    const pencilClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsEditable(!isEditable)
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

        // only trigger API if some value was updated.
        if (Object.keys(updateObj).length > 0) {
            updateTaskInfo(taskId, updateObj)
        }
        setIsEditable(!isEditable)
    }

    const newTitleChanged = (e) => {
        const { value } = e.target
        setNewTitle(value)
    }

    const newDescriptionChanged = (e) => {
        const { value } = e.target
        setNewDescription(value)
    }

    let subTaskComponents = [];
    if (expanded) {
        subTaskComponents = Object.entries(subTaskTree).map(([key, s]) => {
            const {
                subTaskTree: subsubTaskTree,
                sectionNames,
            } = s;

            return (
                <Subtask
                    subTasks={subTasks}
                    sectionNames={sectionNames}
                    subTaskTree={subsubTaskTree}
                    isParentCompleted={isCompleted || isParentCompleted}
                    isSubtask={true}
                    taskId={key}
                    id={`subtask-${key}`}
                    key={`subtask-${key}`}
                    updateTaskCompleted={updateTaskCompleted}
                    updateTaskInfo={updateTaskInfo}
                />
            )
        })
    }

    const navigate = useNavigate()
    const subTaskLinkClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/project/${projectId}?parentTaskId=${taskId}`)
    }

    const subTaskLink =
        <div
            className="subtask-link-icon"
            aria-hidden="true"
            onClick={subTaskLinkClicked}
        >
            <svg width="24" height="24">
                <g fill="none" transform="translate(4 4)">
                    <circle cx="8" cy="8" r="7.5" stroke="currentColor">
                    </circle>
                    <path fill="currentColor" d="M10.11 7.82L8.15 5.85a.5.5 0 1 1 .7-.7l2.83 2.82a.5.5 0 0 1 0 .71l-2.83 2.83a.5.5 0 1 1-.7-.7l1.98-1.99H4.5a.5.5 0 1 1 0-1h5.61z">
                    </path>
                </g>
            </svg>
        </div>
    /*
    const checkbox2 = 
    <div className="task_checkbox__circle"><svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg></div>

    const checkbox = (<path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path>)
    */
    return (
        <div
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
            className='subtask-container'
        >
            <div
                onClick={onClick}
                className={`subtask-content ${isSubtask ? '' : 'top-level-subtask'}`}
            >

                <div className='subtask-title'>
                    <div
                        className='completed-button-container'
                        onClick={onCompletedCheckboxClicked}
                    >
                        {
                            (isParentCompleted || isCompleted) ?
                                (

                                    <div className='task-check-circle'>
                                        ✓
                                    </div>
                                )
                                : <div className='task-check-circle'>

                                </div>
                        }
                    </div>
                    {
                        isEditable ?
                            (
                                <textarea
                                    type="text"
                                    name="newTitle"
                                    value={newTitle}
                                    className="form-control"
                                    onChange={newTitleChanged}
                                />
                            ) : <span>{title}</span>
                    }
                    <div className='subtask-options-container'>
                        {
                            isEditable ? <div onClick={saveClicked}>✓</div>
                                : (isHover ? <Pencil onClick={pencilClicked} /> : null)
                        }
                    </div>
                </div>
                {
                    isEditable ?
                        (
                            <textarea
                                type="text"
                                name="newDescription"
                                value={newDescription}
                                className="form-control"
                                onChange={newDescriptionChanged}
                            />
                        ) : <div className='subtask-description'> {description} </div>
                }
                <div className='subtask-link-container'>
                    {subTaskLink}
                    {(subTaskCount > 0 && !expanded) ? (<div className='subtask-count'>{subTaskCount}</div>) : null}
                </div>
                <div>
                    {subTaskComponents}
                </div>
            </div>
            {!isSubtask ?
                <AddSubtaskModal trigger={<AddButton isVisibleContent={(isHover)} />}
                    taskPath={taskPath}
                    parentTaskId={parentTaskId}
                    sectionIdx={sectionIdx}
                    idx={idx+1}
                    createTask={createTask}
                />
                : null}
        </div>
    );

}
export default Subtask;