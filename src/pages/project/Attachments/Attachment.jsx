import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import axios from 'axios'
import './Attachments.css'
import DeleteButton from '../../../Components/Icons/DeleteButton/DeleteButton';

const Attachment = (
    {
        id,
        url,
        description,
        name,
        type,
        projectId,
        deleteAttachment,
    }
) => {

    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const confirmDelete = () => {
        deleteAttachment(id)
        // create the attachment and add to 
        axios.post(
            'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/deleteattachment',
            {
                id,
                projectId,
            }
        ).then(result => {
            console.log('got result: ', result);
        })
    }

    const onDeleteClick = (e, close) => {
        e.preventDefault()
        close()
        console.log('delete attachment clicked')
        confirmDelete()
    }

    return (
        <div
            className='attachment-row'
            onMouseEnter={() => { setShowDeleteButton(true) }}
            onMouseLeave={() => { setShowDeleteButton(false) }}
        >
            <span className='attachment-type-label'>{type}</span>
            <a
                href={url}
                rel='noreferrer'
                target="_blank"
                className='attachment-name'
            >
                {name}
            </a>
            {
                showDeleteButton ?
                    (
                        <Popup trigger={
                            <div>Delete</div>
                        }
                            closeOnDocumentClick
                            className='confirm-delete-popup'
                            closeOnEscape
                        >
                            {close => (
                                <div className="modal2">
                                    <button
                                        className="close"
                                        onClick={close}
                                    >
                                        &times;
                                    </button>
                                    <div className="header"> Confirm Delete </div>
                                    <div className="content">
                                        <div>
                                            Are you sure you want to delete?
                                        </div>
                                        <button
                                            className="btn btn-dark"
                                            onClick={(e) => onDeleteClick(e, close)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        
                    )
                    : null
            }
        </div>

    )
}
export default React.memo(Attachment);