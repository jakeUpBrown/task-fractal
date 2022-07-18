import React from 'react'
import './AddButton.css';

class AddButton extends React.Component {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={'add-button-container'}
            >
                <div
                    className={`add-button-content ${this.props.isVisibleContent ? '' : 'add-button-hidden'}`}
                >
                    <span>+</span>
                </div>
            </div>

        )
    }
}

export default AddButton;
