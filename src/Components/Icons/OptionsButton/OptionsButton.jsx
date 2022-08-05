import React from 'react'
import Popup from 'reactjs-popup';
import './OptionsButton.css';

const OptionsButton = ({
    content
}) => {

    return (
        <Popup
            trigger={<div
                    className='project-settings-button'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" transform="translate(3 10)">
                            <circle cx="2" cy="2" r="2"></circle>
                            <circle cx="9" cy="2" r="2"></circle>
                            <circle cx="16" cy="2" r="2"></circle>
                        </g>
                    </svg>
                </div>
            }
            position={["bottom left", "bottom", 'top center',  'left bottom']}
            closeOnDocumentClick
            contentStyle={{ padding: '0px', border: 'none' }}
            className='options-button-popup'
            keepTooltipInside="#root"
            arrow={false}
            nested
        >
            {content}
        </Popup>
    )
}

export default OptionsButton;


