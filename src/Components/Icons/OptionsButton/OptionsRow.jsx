import React from 'react'
import './OptionsRow.css';

const OptionsRow = ({
    content,
    icon,
    title,
    onClick,
}) => {

    return (
        <div
            className='options-row-container'
            onClick={onClick}
        >
            {content ? content
                : (
                    <div>
                        {icon}
                        <span className='options-row-title'>
                            {title}
                        </span>
                    </div>
                )}
        </div>
    )
}

export default OptionsRow;


