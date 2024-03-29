import React from 'react'
import { ProjectSubtype, ProjectType } from '../../Utils/constants'
import ProjectRow from './ProjectRow'
import SubTypeList from './SubTypeList'

const TypeList = ({
    type,
    projects,
    updateProjectCompleted,
    subTypeFilter,
    showCompleted,
}) => {

    const typeDisplayName = ProjectType[type].label
    // check if type has any subtypes defined
    if (!(type in ProjectSubtype)) {
        return (<div className="project-list-type-container">
            <div className='project-type-header'>{typeDisplayName}</div>
            {projects.map(project =>
                <ProjectRow
                    showCompleted={showCompleted}
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

    console.log('subTypeFilter', subTypeFilter)

    const subTypeComponents = (Object.keys(subTypeLists).length > 0) ?
        Object.entries(subTypeLists).map(([subType, projectList]) => {
            if (!!subTypeFilter && subType !== subTypeFilter) return null;
            const subTypeDisplayName = ProjectSubtype[type][subType].label
            return (
                <SubTypeList
                    showCompleted={showCompleted}
                    subType={subTypeDisplayName}
                    projects={projectList}
                    updateProjectCompleted={updateProjectCompleted}
                />
            )
        }
        )
        : null;

    const noSubTypeComponents = (noSubTypeList.length > 0) ?
        noSubTypeList.map(project =>
            <ProjectRow
                {...project}
                updateProjectCompleted={updateProjectCompleted}
                showCompleted={showCompleted}
            />
        )
        : null;

    return (
        <div className="project-list-type-container">
            <div className='project-type-header'>{typeDisplayName}</div>
            {subTypeComponents}
            {noSubTypeComponents ? (<div>{'(no subtype)'}</div>) : null}
            {noSubTypeComponents}
        </div>
    )
}
export default TypeList;