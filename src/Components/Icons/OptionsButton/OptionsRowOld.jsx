import React from 'react'
import './OptionsRow.css';

const OptionsRowOld = ({
    content,
    icon,
    title,
    onClick,
}) => {

    let innerComp = null
    if (content) {
        innerComp = {content}
    } else {
        innerComp = (
            <div>
                {icon}
                <span className='options-row-title'>
                    {title}
                </span>
            </div>
        )
    }
    return (
        <div
            className='options-row-container'
            onClick={onClick}
        >
            {innerComp}
        </div>
    )
}

export default OptionsRowOld;


