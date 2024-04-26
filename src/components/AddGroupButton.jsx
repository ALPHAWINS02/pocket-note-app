import React from 'react';
import './AddGroupButton.css'; // Import CSS file

const AddGroupButton = ({ onAddGroup }) => {
    return (
        <button className="add-group-button" onClick={onAddGroup}>
            <span className="plus-sign">+</span>
        </button>
    );
};

export default AddGroupButton;
