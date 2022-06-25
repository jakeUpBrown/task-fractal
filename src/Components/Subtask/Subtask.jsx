import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../pages/project/Project.css'
import './Subtask.css'

const Subtask = ({
    taskId,
    subTaskTree,
    sectionNames,
    isSubtask = false,
    isParentCompleted = false,
    subTasks,
}) => {

    const [expanded, setExpanded] = useState(false);

    const {
        title: taskName,
        description: taskDescription,
        isCompleted,
    } = subTasks[taskId];

    const subTaskCount = subTaskTree ? Object.keys(subTaskTree).length : 0;

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (subTaskCount === 0) return;
        setExpanded(!expanded);
    }

    const onCompletedCheckboxClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('checkbox clicked, ')
    }

    let subTaskComponents = [];
    if (expanded) {
        subTaskComponents = Object.entries(subTaskTree).map(([key, s]) => {
            const subsubTask = subTasks[key]
            const name = subsubTask.title;
            const description = subsubTask.description;
            const {
                subTaskTree: subsubTaskTree,
                sectionNames,
            } = s;

            return (
                <Subtask
                    taskName={name}
                    taskDescription={description}
                    subTasks={subTasks}
                    sectionNames={sectionNames}
                    subTaskTree={subsubTaskTree}
                    isParentCompleted={isCompleted || isParentCompleted}
                    isSubtask={true}
                    taskId={key}
                    id={`subtask-${key}`}
                    key={`subtask-${key}`}
                />
            )
        })
    }

    const checkbox = (<path fill="currentcolor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path>)

    return (
        <div onClick={onClick} className={`subtask-container ${isSubtask ? '' : 'top-level-subtask'}`}>
            <div className='subtask-title'>
                <div className='completed-button-container'>
                    {
                        (isParentCompleted || isCompleted) ?
                            (
                                <button className='task-check-circle' onClick={onCompletedCheckboxClicked}>
                                    {checkbox}
                                </button>
                            )
                            : <button className='task-check-circle'>

                            </button>
                    }
                </div>
                <span>
                    {taskName}
                </span>
                {(subTaskCount > 0 && !expanded) ? (<div className='subtask-count'>{subTaskCount}</div>) : null}
            </div>
            <div className='subtask-description'> {taskDescription} </div>
            {!isSubtask ? <Link to={`/project/1?parentTaskId=${taskId}`}>SUBTASK LINK</Link> : null}
            <div>
                {subTaskComponents}
            </div>
        </div>
    );

}
export default Subtask;