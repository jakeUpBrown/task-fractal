import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ProjectList.css'
import ProjectRow from './ProjectRow'
import TypeList from './TypeList'
import AddProjectModal from '../../Components/Modals/AddProject/AddProjectModal'

const ProjectList = () => {
  const [projects, setProjects] = useState();
  const [error, setError] = useState()

  useEffect(() => {
    if (!!projects) {
      console.log('already loaded projects');
      return;
    }
    async function readProjects() {
      axios.post(
        'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/readprojects',
        {}
      ).then(result => {
        console.log('got result: ', result);
        setProjects(result.data);
      })
    }
    readProjects();
  }, [projects]);

  if (!!!projects) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const updateProjectCompleted = (e, id, isCompleted) => {
    e.preventDefault()
    console.log('project completed clicked', id, isCompleted)
    const idx = projects.findIndex((p) => p.id === id)
    const newProjects = projects.slice(0)
    newProjects[idx].isCompleted = isCompleted
    setProjects(newProjects)
    // call updateProjectCompleted API
    axios.post(
      'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/updateprojectcompleted',
      {
        projectId: id,
        isCompleted,
      }
    ).then(result => {
      console.log('project updated successfully: ', result);
    }).catch(err => {
      console.log(err)
      setError(err.message);
    })
  }

  // sort projects into buckets by type
  // check if project has any subtypes
  const typeLists = {}
  const noTypeList = []

  projects.forEach(project => {
    if ('type' in project && project.type) {
      if (!(project.type in typeLists)) {
        typeLists[project.type] = []
      }
      typeLists[project.type].push(project)
    } else {
      noTypeList.push(project)
    }
  })

  console.log('typeLists', typeLists)
  console.log('noTypeList', noTypeList)


  const typeComponents = (typeLists) ?
    Object.entries(typeLists).map(([type, projectList]) => {
      console.log('type', type)
      console.log('projectList', projectList)
      return (<TypeList
        type={type}
        projects={projectList}
        updateProjectCompleted={updateProjectCompleted}
      />)
    }
    )
    : null;

  const noTypeComponents = (noTypeList) ?
    noTypeList.map(project =>
      <ProjectRow
        {...project}
        updateProjectCompleted={updateProjectCompleted}
      />
    )
    : null;

  console.log('noTypeComponents', noTypeComponents)
  console.log('typeComponents', typeComponents)

  return (
    <div className="project-list-container">
      {typeComponents}
      {noTypeComponents ? (<div>{'(no type)'}</div>) : null}
      {noTypeComponents}
      <AddProjectModal 
        trigger={<span className='create-project-button'>Create Project</span>}
      />
    </div>
  )
}
export default ProjectList;