import React, { useReducer } from 'react'
import ReactDropdown from 'react-dropdown'
import { AttachmentType } from '../../../../Utils/constants'
import axios from 'axios'

const getAttachmentTypeFromUrl = (url) => {
    if (!!!url) return;
    if (url.includes('docs.google.com/spreadsheets')) {
        return AttachmentType.SHEETS.value
    }
    if (url.includes('connect.trimble.com')) {
        return AttachmentType.SKETCHUP.value
    }
    if (url.includes('docs.google.com/document')) {
        return AttachmentType.DOCS.value
    }
    if (url.includes('github.com')) {
        return AttachmentType.GITHUB.value
    }
    if (url.includes('drive.google.com')) {
        return AttachmentType.DRIVE.value
    }
    // TODO: add CONCEPTS
}

const AddAttachment = ({
  projectId,
  addAttachment,
}) => {
    const options = Object.values(AttachmentType);

  const formInitialState = {
    name: '',
    url: '',
    description: '',
    type: options[0].value,
  }

  const [inputValues, dispatchFormValue] = useReducer(
    (curVal, newVal) => ({ ...curVal, ...newVal }),
    formInitialState,
  )

  const { name, url, description, type } = inputValues

  const reducerInputChange = (e) => {
    const { name, value } = e.target
    switch(name) {
        case 'url': 
            const attachmentType = getAttachmentTypeFromUrl(value)
            if (attachmentType) {
                console.log('guessing attachment type: ', attachmentType)
                dispatchFormValue(
                    { 
                        [name]: value,
                        type: attachmentType,
                    }
                )
                return
            } // else fallthrough

        default: 
            dispatchFormValue({ [name]: value })
    }
    
    console.log(inputValues)
  }

  const clearInputValues = () => {
    dispatchFormValue({...formInitialState})
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(inputValues)
    // create the attachment and add to 
    const id = "12345"
    const attachment = {
      id,
      projectId,
      name,
      type,
      url,
      description,
    }
    axios.post(
        'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/createattachment',
        attachment
      ).then(result => {
        console.log('got result: ', result);
        // TODO: add attachment to list
        addAttachment(attachment)
        clearInputValues();
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
            name="name"
            value={name}
            className="form-control"
            onChange={reducerInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-2">
            <strong>url</strong>
          </label>
          <input
            type="text"
            name="url"
            value={url}
            className="form-control"
            onChange={reducerInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-2">
            <strong>type</strong>
          </label>
          <ReactDropdown
            options={options} 
            onChange={(e) => reducerInputChange({target: { name: 'type', value: e.value } })} 
            value={type} 
            placeholder="Select an option"
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
          <button type="submit" className="btn btn-dark">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddAttachment;