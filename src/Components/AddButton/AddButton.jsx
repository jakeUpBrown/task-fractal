import React, { useEffect } from 'react'
import './AddButton.css';

const AddButton = ({
    onClick,
}) => {

    return (
        <div className='add-button-container'>
            <button
                className='add-button'
                onClick={onClick}
            >
                <span>+</span>
            </button>
        </div>

    )
}
export default AddButton;
