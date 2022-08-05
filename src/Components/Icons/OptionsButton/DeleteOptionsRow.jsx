import React from 'react'
import DeleteButton from '../DeleteButton/DeleteButton';
import './DeleteOptionsRow.css';
import OptionsRow from './OptionsRow';
import Popup from 'reactjs-popup';

class DeleteOptionsRow extends React.Component {
    render() {
        return (
            <Popup trigger={
                <OptionsRow
                    title={'Delete'}
                    icon={<DeleteButton />}
                    onClick={() => console.log('2')}
                />
            }
                closeOnDocumentClick
                className='confirm-delete-popup'
                nested
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
        )
    }
}

export default DeleteOptionsRow;


