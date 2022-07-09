import React from 'react'
import './AddButton.css';

const AddButton = ({
    onClick,
    isVisibleContent = true,
}) => {

    return (
        <div
            onClick={onClick}
            className={'add-button-container'}
        >
            <div
                className={`add-button-content ${isVisibleContent ? '' : 'add-button-hidden'}`}
            >
                <span>+</span>
            </div>
        </div>

    )
}
export default AddButton;
