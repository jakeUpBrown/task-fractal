import React, { useState } from 'react'
import './Section.css'
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import Subtask from '../Subtask/Subtask'
import AddButton from '../AddButton/AddButton';

const Section = ({
    sectionName,
    subTasks,
    subTaskTree,
    itemId,
    updateTaskCompleted,
}) => {

    const [showAddButton, setShowAddButton] = useState(false);

    // get all the subtasks to display and create
    const visibility = React.useContext(VisibilityContext);

    const visible = visibility.isItemVisible(itemId);

    const subTaskComponents = !!subTaskTree && subTaskTree.map(s => {
        const {
            subTaskTree: subsubTaskTree,
            sectionNames,
        } = s;
        return (<Subtask
            subTaskTree={subsubTaskTree}
            sectionNames={sectionNames}
            subTasks={subTasks}
            taskId={s.taskId}
            id={`subtask-${s.taskId}`}
            key={`subtask-${s.taskId}`}
            updateTaskCompleted={updateTaskCompleted}
        />
        );
    })

    const addButtonClicked = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('add button clicked')
    }
    return (
        <div
            className='section-container'
            role="button"
            tabIndex={0}
        >
            <div>
                <h4 style={{ backgroundColor: visible ? "transparent" : "gray" }}>
                    {sectionName}
                </h4>
            </div>
            <div
                onMouseEnter={() => { setShowAddButton(true) }}
                onMouseLeave={() => { setShowAddButton(false) }}
            >
                {subTaskComponents}
                {showAddButton ? <AddButton onClick={addButtonClicked}/> : null}
            </div>
        </div>
    );
    /*
  return (
    <div className="sectionContainer">

      <div className="sectionHeader">
        {sectionName}
      </div>

      <div className='subTaskContainer'>
        
      </div>
    </div>
  )
  */
}
export default Section;