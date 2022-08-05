import React from 'react'
import './OptionsRow.css';

class OptionsRow extends React.Component {
    render() {
        return (
            <div
                className='options-row-container'
                onClick={this.props.onClick}
            >
                {this.props.content ? this.props.content
                    : (
                        <div>
                            {this.props.icon}
                            <span className='options-row-title'>
                                {this.props.title}
                            </span>
                        </div>
                    )}
            </div>
        )
    }
}

export default OptionsRow;


