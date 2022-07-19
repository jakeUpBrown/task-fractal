import React, { useState } from 'react'
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

    const onDeleteClick = (e) => {
        e.preventDefault()
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
                        <DeleteButton
                            onDeleteClick={onDeleteClick}
                        />
                    )
                    : null
            }
        </div>

    )
}
export default React.memo(Attachment);