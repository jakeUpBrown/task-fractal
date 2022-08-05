import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Popup from 'reactjs-popup';
import DeleteButton from '../../../../Components/Icons/DeleteButton/DeleteButton';
import OptionsButton from '../../../../Components/Icons/OptionsButton/OptionsButton';
import OptionsRow from '../../../../Components/Icons/OptionsButton/OptionsRowOld';
import Pencil from '../../../../Components/Icons/Pencil';
import axios from "axios";

import './ProjectOptions.css';

const ProjectOptions = ({
    toggleIsEditable,
    setError,
}) => {
    let [searchParams] = useSearchParams();
    const parentTaskId = searchParams.get('parentTaskId')
    const {
      projectId,
    } = useParams();

    const navigate = useNavigate()

    const onDelete = (e, close) => {
        e.preventDefault()
        e.stopPropagation()
        close()
        axios.post(
            'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/deleteproject',
            {
              projectId,
            }
          ).then(result => {
            console.log('tasks updated successfully: ', result);
            navigate('/projectList')
          }).catch(err => {
            console.log(err)
            navigate('/failed')
          })
      
        console.log('delete confirmed')
    }

    return (
        <OptionsButton
            content={
                <div className='project-options-container'>
                    <OptionsRow
                        title={'Edit'}
                        icon={<Pencil />}
                        onClick={toggleIsEditable}
                    />

                    <Popup trigger={
                        <OptionsRow
                            title={'Delete'}
                            icon={<DeleteButton />}
                        />
                    }
                        closeOnDocumentClick
                        className='confirm-delete-popup'
                        nested
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
                                        onClick={(e) => onDelete(e, close)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            }
        />
    )
}

export default ProjectOptions;


