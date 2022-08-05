import React, { useReducer } from 'react';
import Popup from 'reactjs-popup';
import { genRanHex } from '../../../Utils/idUtils';
import './AddSubtaskModal.css'
import '../Modals.css'

const AddSubtaskModal = ({
    trigger,
    taskPath,
    parentTaskId,
    idx,
    sectionIdx,
    createTask,
}) => {

    const formInitialState = {
        title: '',
        description: '',
    }

    const [inputValues, dispatchFormValue] = useReducer(
        (curVal, newVal) => ({ ...curVal, ...newVal }),
        formInitialState,
    )

    const { title, description } = inputValues

    const reducerInputChange = (e) => {
        const { name, value } = e.target
        dispatchFormValue({ [name]: value })

        console.log(inputValues)
    }

    const onFormSubmit = (e, close) => {
        e.preventDefault()
        close()
        console.log('inputValues', inputValues)
        // create the attachment and add to 
        const taskId = genRanHex(10)
        console.log('submitting', taskPath, parentTaskId, idx)
        createTask({
            newTask: {
                title,
                description,
                taskId,
            },
            taskPath,
            parentTaskId,
            sectionIdx,
            idx,
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
                    <div className="header"> Create Task </div>
                    <div className="content">
                        <div className="container mt-3">
                            <form onSubmit={(e) => onFormSubmit(e, close)} noValidate>
                                <div className="form-group mb-3">
                                    <label className="mb-2">
                                        <strong>Title</strong>
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
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                    >
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

export default AddSubtaskModal