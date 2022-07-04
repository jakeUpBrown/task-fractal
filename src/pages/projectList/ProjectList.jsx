import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddProject from './AddProject/AddProject'
import './ProjectList.css'
import ProjectRow from './ProjectRow'

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

  return (
    <div className="project-list-container">

      {projects.map(project =>
        <ProjectRow
          key={`project-row-id-${project.id}`}
          name={project.name}
          id={project.id}
          isCompleted={project.isCompleted}
          updateProjectCompleted={updateProjectCompleted}
        />)}
      <br />
      <br />
      <AddProject />
    </div>
  )
}
export default ProjectList;