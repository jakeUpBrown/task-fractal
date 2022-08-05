

import React, { useReducer } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios'
import { genRanHex } from '../../../Utils/idUtils';
import { ProjectSubtype, ProjectType } from '../../../Utils/constants'
import './AddProjectModal.css'
import '../Modals.css'
import { useNavigate } from 'react-router';
import TypeDropdown from '../../TypeDropdown/TypeDropdown';

const AddProjectModal = ({
    trigger,
}) => {

    const formInitialState = {
        title: '',
        type: ProjectType.NO_TYPE.value,
        subType: ProjectType.NO_TYPE.value,
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
    const onFormSubmit = (e, close) => {
        e.preventDefault()
        close()
        console.log(inputValues)
        // create the attachment and add to 
        const id = genRanHex(10)
        axios.post(
            'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/createproject',
            {
                id,
                description,
                type,
                subType,
                title,
                isFinished: false,
            }
        ).then(result => {
            console.log('got result: ', result);
            navigate(`/project/${id}`)
        })
    }

    return (
        <Popup
            trigger={trigger}
            modal
            nested
        >
            {close => (
                <div className="modal1">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Create Project </div>
                    <div className="content">
                        <div className="container mt-3">
                            <form onSubmit={(e) => onFormSubmit(e, close)} noValidate>
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

                    </div>
                </div>
            )}
        </Popup>
    );
}

export default AddProjectModal