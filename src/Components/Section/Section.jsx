import React, { useState } from 'react'
import './Section.css'
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import Subtask from '../Subtask/Subtask'
import AddButton from '../Icons/AddButton';
import Pencil from '../Icons/Pencil';
import AddSubtaskModal from '../Modals/AddSubtask/AddSubtaskModal';

const Section = ({
    project,
    taskPath,
    parentTaskId,
    sectionIdx,
    sectionNames,
    subTasks,
    subTaskTree,
    itemId,
    updateTaskCompleted,
    updateTaskInfo,
    updateProjectInfo,
    createTask,
}) => {

    const sectionName = sectionNames ? sectionNames[sectionIdx] : ''
    const [isEditable, setIsEditable] = useState(false)
    const [newSectionName, setNewSectionName] = useState(sectionName)
    const [isTitleHover, setIsTitleHover] = useState(false)

    // get all the subtasks to display and create
    const visibility = React.useContext(VisibilityContext);

    const visible = visibility.isItemVisible(itemId);

    const subTaskComponents = !!subTaskTree && subTaskTree.sort((a,b) => a.idx - b.idx).map((s, idx) => {
        const {
            subTaskTree: subsubTaskTree,
            sectionNames,
        } = s;
        return (<Subtask
            subTaskTree={subsubTaskTree}
            sectionNames={sectionNames}
            idx={idx}
            sectionIdx={sectionIdx}
            subTasks={subTasks}
            taskId={s.taskId}
            id={`subtask-${s.taskId}`}
            key={`subtask-${s.taskId}`}
            updateTaskCompleted={updateTaskCompleted}
            updateTaskInfo={updateTaskInfo}
            taskPath={taskPath}
            parentTaskId={parentTaskId}
            createTask={createTask}
        />
        );
    })

    const pencilClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('isEditable', !isEditable)
        setIsEditable(!isEditable)
    }

    const saveClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sectionName === newSectionName) {
            console.log('section name was not changed. Ignoring save.')
            setIsEditable(!isEditable)
            return;
        }
        var newSectionNames = []
        Object.assign(newSectionNames, sectionNames)
        newSectionNames[sectionIdx] = newSectionName
        if (parentTaskId) {
            var newSubTaskTree = {}
            Object.assign(newSubTaskTree, project.subTaskTree)
            // get the object that's holding the sectionNames
            var currentObj = newSubTaskTree
            taskPath.forEach(tid => { currentObj = currentObj[tid].subTaskTree })
            currentObj[parentTaskId].sectionNames = newSectionNames
            updateProjectInfo(
                { subTaskTree: newSubTaskTree }
            )
        } else {
            updateProjectInfo(
                { sectionNames: newSectionNames }
            )
        }
        setIsEditable(!isEditable)
    }

    const newSectionNameChanged = (e) => {
        const { value } = e.target
        setNewSectionName(value)
    }

    return (
        <div
            className='section-container'
            role="button"
            tabIndex={0}
        >
            <div
                className='section-header-container'
                onMouseEnter={() => { setIsTitleHover(true) }}
                onMouseLeave={() => { setIsTitleHover(false) }}
            >
                <div className='section-header-contents'>
                    {isEditable ? (
                        <div className='section-name-edit-text'>
                            <textarea
                                type="text"
                                name="newSectionName"
                                value={newSectionName}
                                className="form-control"
                                onChange={newSectionNameChanged}
                            />
                        </div>
                    ) : <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
                        {sectionName}
                    </div>
                    }
                    {isEditable ?
                        (<div
                            onClick={saveClicked}
                            className='icon_menu_item__icon'
                        >
                            ✓
                        </div>)
                        : (isTitleHover ? <Pencil onClick={pencilClicked} /> : null)
                    }
                </div>
                <AddSubtaskModal
                    trigger={<AddButton isVisibleContent={(isTitleHover)} />}
                    taskPath={taskPath}
                    parentTaskId={parentTaskId}
                    sectionIdx={sectionIdx}
                    idx={0}
                    createTask={createTask}
                />
            </div>
            <div className='top-level-subtask-container'>
                {subTaskComponents}
            </div>
        </div >
    );

}
export default Section;