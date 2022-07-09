import React from 'react'
import ProjectRow from './ProjectRow'
import './ProjectList.css'

const SubTypeList = ({
    subType,
    projects,
    updateProjectCompleted,
}) => {

    // check if project has any subtypes
    // if it does, create SubTypeList for every subtype found
    // list all of the projects with no subtypes


    return (
        <div className="project-list-subtype-container">
            <div className="project-subtype-header"> {subType} </div>
            {projects.map((project) =>
                <ProjectRow
                    {...project}
                    updateProjectCompleted = { updateProjectCompleted }
                />)}
        </div>
    )
}
export default SubTypeList;