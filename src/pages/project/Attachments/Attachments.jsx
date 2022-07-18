import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Attachments.css'
import Attachment from './Attachment'
import AddAttachmentModal from '../../../Components/Modals/AddAttachment/AddAttachmentModal'

const Attachments = (
  {
    projectId,
  }
) => {
  const [attachments, setAttachments] = useState();

  useEffect(() => {
    if (!!attachments) {
      console.log('already loaded attachments');
      return;
    }
    async function readAttachments() {
      axios.post(
        'https://p0ts58nd3h.execute-api.us-west-1.amazonaws.com/prod/readattachments',
        { projectId }
      ).then(result => {
        console.log('got result: ', result);
        setAttachments(result.data);
      })
    }
    readAttachments();
  }, [attachments, projectId]);

  if (!!!attachments) {
    return <div>Loading...</div>
  }

  const addAttachment = (attachment) => {

    setAttachments([
      ...attachments,
      attachment,
    ])
  }

  const deleteAttachment = (id) => {
    const idx = attachments.findIndex((att) => att.id === id)
    const newAttachments = attachments.slice(0)
    newAttachments.splice(idx, 1)
    setAttachments(newAttachments)
  }

  return (
    <div className="attachments-container">
      <div className="attachments-header">
        <span>ATTACHMENTS</span>
        <AddAttachmentModal
          trigger={<span className='add-attachment-button'>+</span>}
          projectId={projectId}
          addAttachment={addAttachment}
        />
      </div>
      {attachments.map(att => {
        return (
          <Attachment
            key={`attachment-${att.id}`}
            deleteAttachment={deleteAttachment}
            {...att}
          />
        )
      })}
    </div>
  )
}
export default React.memo(Attachments);