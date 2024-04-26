import React, { useState, useRef, useEffect } from 'react';
import './AddGroupDialog.css';

const AddGroupDialog = ({ onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState('');
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleAddGroup = () => {
        if (groupName.trim() !== '' && color !== '') {
            onAddGroup({ name: groupName, color, groupNotes: [] });
            setGroupName('');
            setColor('');
            onClose();
        }
    };

    return (
        <div className="add-group-dialog">
            <div className="dialog-content" ref={dialogRef}>
                <h2 className="dialog-title">Create New Group</h2>
                <div className="form-group">
                    <p>Group Name</p>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                        className="group-name-input"
                    />
                </div>
                <div className="form-group">
                    <p>Choose Color</p>
                    <div className="color-buttons">
                        {['blue', 'green', 'red', 'orange', 'black'].map((c) => (
                            <button
                                key={c}
                                className={`color-button ${color === c ? 'selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={handleAddGroup} className="add-button">Create</button>
                </div>
            </div>
        </div>
    );
};

export default AddGroupDialog;
