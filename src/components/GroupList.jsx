import React, { useState } from 'react';
import './GroupList.css';
import AddGroupDialog from './AddGroupDialog';
import { capitalizeFirstLetter } from '../utils';

const GroupList = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
    const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);

    const handleOpenAddGroupDialog = () => {
        setIsAddGroupDialogOpen(true);
    };

    const handleCloseAddGroupDialog = () => {
        setIsAddGroupDialogOpen(false);
    };

    const handleAddGroup = (newGroup) => {
        onAddGroup(newGroup);
        handleCloseAddGroupDialog();
    };

    return (
        <div className="group-list">
            <h2 className="sticky-header">Pocket Notes</h2>
            <ul>
                {groups.map((group, index) => (
                    <li
                        key={index}
                        className={`group-item ${group.name === selectedGroup?.name ? 'selected' : ''}`}
                        onClick={() => onSelectGroup(group)}
                    >
                        <div
                            className={`group-icon bg-${group.color}`}
                            style={{ backgroundColor: group.color }}
                        >
                            {group.name.substring(0, 2).toUpperCase()}
                        </div>
                        {capitalizeFirstLetter(group.name)}
                    </li>
                ))}
            </ul>
            <div className='sticky-footer'>
                <button className="add-group-button" onClick={handleOpenAddGroupDialog}>
                    <span className="plus-sign">+</span>
                </button>
            </div>
            {isAddGroupDialogOpen && (
                <AddGroupDialog onClose={handleCloseAddGroupDialog} onAddGroup={handleAddGroup} />
            )}
        </div>
    );
};

export default GroupList;
