import React from 'react'
import { ProjectSubtype } from '../../Utils/constants'
import ProjectRow from './ProjectRow'
import SubTypeList from './SubTypeList'

const TypeList = ({
    type,
    projects,
    updateProjectCompleted,
}) => {

    // check if type has any subtypes defined
    if (!(type in ProjectSubtype)) {
        return (<div className="project-list-type-container">
            <div>{type}</div>
            {projects.map(project =>
                <ProjectRow
                    {...project}
                    updateProjectCompleted={updateProjectCompleted}
                />
            )}
        </div>)
    }

    // check if project has any subtypes
    const subTypeLists = {}
    const noSubTypeList = []

    console.log('projects in type', type, projects)
    projects.forEach(project => {
        if ('subType' in project && project.subType) {
            if (!(project.subType in subTypeLists)) {
                subTypeLists[project.subType] = []
            }
            subTypeLists[project.subType].push(project)
        } else {
            noSubTypeList.push(project)
        }
    })

    const subTypeComponents = (Object.keys(subTypeLists).length > 0) ?
        Object.entries(subTypeLists).map(([subType, projectList]) =>
            <SubTypeList
                subType={subType}
                projects={projectList}
                updateProjectCompleted={updateProjectCompleted}
            />
        )
        : null;

    const noSubTypeComponents = (noSubTypeList.length > 0) ?
        noSubTypeList.map(project =>
            <ProjectRow
                {...project}
                updateProjectCompleted={updateProjectCompleted}
            />
        )
        : null;

    // if it does, create SubTypeList for every subtype found
    // list all of the projects with no subtypes


    return (
        <div className="project-list-type-container">
            <div>{type}</div>
            {subTypeComponents}
            {noSubTypeComponents ? (<div>{'(no subtype)'}</div>) : null}
            {noSubTypeComponents}
        </div>
    )
}
export default TypeList;