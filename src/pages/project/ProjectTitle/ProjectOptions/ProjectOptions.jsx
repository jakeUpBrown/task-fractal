import React from 'react'
import Popup from 'reactjs-popup';
import DeleteButton from '../../../../Components/Icons/DeleteButton/DeleteButton';
import OptionsButton from '../../../../Components/Icons/OptionsButton/OptionsButton';
import OptionsRow from '../../../../Components/Icons/OptionsButton/OptionsRow';
import Pencil from '../../../../Components/Icons/Pencil';

import './ProjectOptions.css';

const ProjectOptions = ({
    toggleIsEditable,
    deleteProject,
}) => {
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
                            onClick={() => console.log('2')}
                        />
                    }
                        closeOnDocumentClick
                        className='confirm-delete-popup'
                    >
                        <div className="modal2">
                            <a className="close">
                                &times;
                            </a>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                            omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                            ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                            doloribus. Odit, aut.
                        </div>
                    </Popup>
                </div>
            }
        />
    )
}

export default ProjectOptions;


