import React from 'react'
import './PreviewContainer.css';

const PreviewContainer = () => {
    return (
        <div className="preview-container">
            <div className='preview-container-layout'>
                <img src="/images/preview-notes.png" alt="" className="preview-image" />
                <h1 className="preview-heading">Pocket Notes</h1>
                <p className="preview-text">
                    Send and receive messages without keeping your phone online.
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
                <div className="encryption-container">
                    <img src="/images/end-encrypted.png" alt="encrypted" />
                    <p>end-to-end encrypted</p>
                </div>
            </div>
        </div>
    )
}

export default PreviewContainer