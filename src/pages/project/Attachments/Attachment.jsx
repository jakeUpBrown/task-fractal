import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Attachments.css'

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

    const [ showDeleteButton, setShowDeleteButton ] = useState(false);

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
                        <div
                            className='delete-button'
                            onClick={onDeleteClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" cursor="pointer">
                                <g fill="none" fill-rule="evenodd">
                                    <path d="M0 0h24v24H0z" />
                                    <rect width="14" height="1" x="5" y="6" fill="currentColor" rx=".5" />
                                    <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z" />
                                </g>
                            </svg>
                        </div>

                    )
                    : null
            }
        </div>

    )
}
export default React.memo(Attachment);