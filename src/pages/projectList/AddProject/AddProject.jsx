import React, { useReducer } from 'react'
import ReactDropdown from 'react-dropdown'
import { ProjectSubtype, ProjectType } from '../../../Utils/constants'
import axios from 'axios'
import './AddProject.css'
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const formInitialState = {
        title: '',
        type: '',
        subType: '',
        description: '',
    }

    const [inputValues, dispatchFormValue] = useReducer(
        (curVal, newVal) => ({ ...curVal, ...newVal }),
        formInitialState,
    )

    const { title, description, type, subType } = inputValues

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

    const navigate = useNavigate()
    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(inputValues)
        // create the attachment and add to 
        const id = "12345"
        axios.post(
            'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/createproject',
            { 
                id,
                type,
                subType,
                name: title,
                isFinished: false,
            }
          ).then(result => {
            console.log('got result: ', result);
            navigate(`/project/${id}`)
          })
    }

    return (
        <div className="container mt-3">
            <form onSubmit={onFormSubmit} noValidate>
                <div className="form-group mb-3">
                    <label className="mb-2">
                        <strong>Name</strong>
                    </label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={title}
                        className="form-control"
                        onChange={reducerInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-2">
                        <strong>type</strong>
                    </label>
                    <ReactDropdown
                        options={typeOptions}
                        onChange={(e) => reducerInputChange({ target: { name: 'type', value: e.value } })}
                        value={type}
                        placeholder="Select an option"
                    />
                </div>
                {
                    !!subTypeOptions ?
                        (<div className="form-group mb-3">
                            <label className="mb-2">
                                <strong>subtype</strong>
                            </label>
                            <ReactDropdown
                                options={subTypeOptions}
                                onChange={(e) => reducerInputChange({ target: { name: 'subType', value: e.value } })}
                                value={subType}
                                placeholder="Select an option"
                            />
                        </div>
                        ) : null
                }
                <div className="form-group mb-3">
                    <label className="mb-2">
                        <strong>Description</strong>
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        className="form-control"
                        onChange={reducerInputChange}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-dark">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProject;