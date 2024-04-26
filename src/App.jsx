// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import AddGroupDialog from './components/AddGroupDialog';
import NoteList from './components/NoteList';

function App() {
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem('groups')) || [];
  });
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups'));
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleAddGroup = (newGroup) => {
    console.log('Adding group:', newGroup);
    setGroups([...groups, newGroup]);
    setShowAddGroupDialog(false);
  };

  const handleCloseAddGroupDialog = () => {
    setShowAddGroupDialog(false);
  };

  const handleBackToGroupList = () => {
    setSelectedGroup(null);
  };


  return (
    <div className="app">
      {screenWidth >= 640 && (
        <>
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            onSelectGroup={handleSelectGroup}
            onAddGroup={handleAddGroup}
          />
          <NoteList
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setGroups={setGroups}
            groups={groups}
            onBack={handleBackToGroupList}
          />
        </>
      )}
      {screenWidth < 640 && (
        <>
          {!selectedGroup && (
            <GroupList
              groups={groups}
              selectedGroup={selectedGroup}
              onSelectGroup={handleSelectGroup}
              onAddGroup={handleAddGroup}
            />
          )}
          {selectedGroup && (
            <NoteList
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              setGroups={setGroups}
              groups={groups}
              onBack={handleBackToGroupList}
            />
          )}
        </>
      )}
      {showAddGroupDialog &&
        <AddGroupDialog onClose={handleCloseAddGroupDialog} onAddGroup={handleAddGroup} />}
    </div>
  );

}

export default App;
