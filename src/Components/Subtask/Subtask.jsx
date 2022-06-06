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

    return (
        <div onClick={onClick} className={`subtask-container ${isSubtask ? '' : 'top-level-subtask'}`}>
            <div className='subtask-title'>
                <div className='completed-button-container'>
                    {(isParentCompleted || isCompleted) ? 'X' : 'O'}
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