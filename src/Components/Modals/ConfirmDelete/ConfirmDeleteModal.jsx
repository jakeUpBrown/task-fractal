import React from 'react';
import Popup from 'reactjs-popup';
import './ConfirmDeleteModal.css'
import '../Modals.css'

class ConfirmDeleteModal extends React.Component {

    render() {
        return (
            <Popup
                trigger={this.props.trigger}
                className='confirm-delete-popup'
            >
                {close => (
                    <div className="confirm-delete-container">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
    
                        <div className="header"> Confirm Delete </div>
                        <div className="content">
                            <div>
                                Are you sure you want to delete?
                            </div>
                            <button
                                className="btn btn-dark"
                                onClick={this.props.onSubmit}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );    
    }
}

export default ConfirmDeleteModal