import React from 'react'
import './Section.css'

const AddSectionButton = ({
    numSections,
    project,
    taskPath,
    parentTaskId,
    updateProjectInfo,
}) => {

    const addButtonClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newNumSections = (numSections) ? numSections + 1 : 1;
        if (parentTaskId) {
            var newSubTaskTree = {}
            Object.assign(newSubTaskTree, project.subTaskTree)
            // get the object that's holding the numSections
            var currentObj = newSubTaskTree
            taskPath.forEach(tid => {currentObj = currentObj[tid].subTaskTree})
            currentObj[parentTaskId].numSections = newNumSections       
            updateProjectInfo(
                { subTaskTree: newSubTaskTree}
            )
        } else {
            updateProjectInfo(
                { numSections: (newNumSections) }
            )
        }
    }

    return (
        <div
            className='section-container add-section-button'
            role="button"
            tabIndex={0}
            onClick={addButtonClicked}
        >
            <div>+</div>
            <span>Add Section</span>
        </div >
    );

}
export default AddSectionButton;