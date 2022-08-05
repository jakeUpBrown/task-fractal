import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { ProjectSubtype, ProjectType } from '../../Utils/constants'
import './ProjectList.css'
import TypeList from './TypeList'
import AddProjectModal from '../../Components/Modals/AddProject/AddProjectModal'
import TypeDropdown from '../../Components/TypeDropdown/TypeDropdown'

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

  const formInitialState = {
    type: '',
    subType: '',
  }

  const [inputValues, dispatchFormValue] = useReducer(
    (curVal, newVal) => ({ ...curVal, ...newVal }),
    formInitialState,
  )

  if (!!!projects) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const { type, subType } = inputValues

  const typeOptions = Object.values(ProjectType);
  let subTypeOptions;
  if (!!type) {
    const subTypeOptionObj = ProjectSubtype[type]
    if (!!subTypeOptionObj) {
      subTypeOptions = Object.values(subTypeOptionObj)
    }
  }

  const reducerInputChange = (e) => {
    const { name, value } = e.target
    dispatchFormValue({ [name]: value })

    console.log(inputValues)
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

  const resetFilters = (e) => {
    e.preventDefault()
    reducerInputChange({ target: { name: 'type', value: '' } })
    reducerInputChange({ target: { name: 'subType', value: '' } })
  }

  // sort projects into buckets by type
  // check if project has any subtypes
  const typeLists = {}
  const noTypeList = []

  projects.forEach(project => {
    if (!!type) {
      // check if project.type is selected as filter
      if (type !== project.type) {
        return;
      }
    }
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
        subTypeFilter={subType}
      />)
    }
    )
    : null;

  console.log('typeComponents', typeComponents)

  return (
    <div className='project-list-page'>
      <div className="project-list-container">
        {typeComponents}
        <AddProjectModal
          trigger={<span className='create-project-button'>Create Project</span>}
        />
      </div>
      <div className='project-list-filters-group'>
        <TypeDropdown
          typeOptions={typeOptions}
          onChange={(e) => reducerInputChange({ target: { name: 'type', value: e.value } })}
          value={type}
          placeholder="Select an option"
          label='type'
        />
        <TypeDropdown
          typeOptions={subTypeOptions}
          onChange={(e) => reducerInputChange({ target: { name: 'subType', value: e.value } })}
          value={subType}
          placeholder="Select an option"
          label='subtype'
          isVisible={!!subTypeOptions}
        />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}
export default ProjectList;