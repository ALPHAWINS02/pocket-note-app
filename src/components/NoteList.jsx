import React, { useEffect, useState } from 'react';
import './NoteList.css';
import PreviewContainer from './PreviewContainer';
import { capitalizeFirstLetter } from '../utils';

const NoteList = ({ selectedGroup, setSelectedGroup, setGroups, groups, onBack }) => {
    const [noteContent, setNoteContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    const isDisabled = noteContent.trim() === '';

    const today = new Date();

    const year = today.getFullYear();
    const fullMonthName = today.toLocaleDateString('en-US', { month: 'long' });
    const monthString = fullMonthName.substring(0, 3);

    const day = String(today.getDate()).padStart(2, '0');


    const hours = today.getHours() % 12 || 12; 
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const ampm = today.getHours() >= 12 ? 'PM' : 'AM';

    const formattedDate = `${day} ${monthString} ${year}`; 
    const formattedTime = `${hours}:${minutes} ${ampm}`; 


    const handleNoteChange = (event) => {
        setNoteContent(event.target.value);
    };

    const handleSendNote = () => {
        if (selectedGroup) {
            const updatedNotes = [...(selectedGroup.groupNotes || []), { content: noteContent, date: formattedDate, time: formattedTime }];
            const updatedGroup = { ...selectedGroup, groupNotes: updatedNotes };
            setSelectedGroup(updatedGroup); 
            setNotes(updatedNotes);

            const updatedGroupIndex = groups.findIndex((group) => group.name === selectedGroup.name);
            setGroups([...groups.slice(0, updatedGroupIndex), updatedGroup, ...groups.slice(updatedGroupIndex + 1)]);

            
            setNoteContent('');
        }
    };


    useEffect(() => {
        setNotes(selectedGroup?.groupNotes || [])
    }, [selectedGroup])

    return (
        <>
            {selectedGroup ? (
                <div className="note-list" >
                    <div className="notes-heading">
                        {screenWidth < 768 && selectedGroup && (
                            <button className="back-arrow" onClick={() => onBack()}>
                                <img src="/images/back.png" alt="Back" width={24} height={24} />
                            </button>
                        )}
                        <div
                            className={`group-icon bg-${selectedGroup.color}`}
                            style={{ backgroundColor: selectedGroup.color }}
                        >
                            {selectedGroup.name.substring(0, 2).toUpperCase()}
                        </div>
                        <p className='note-heading-text'>{capitalizeFirstLetter(selectedGroup.name)}</p>
                    </div>
                    {/* Note List  */}
                    <div className="note-list-container">
                        {notes?.map((note) => {
                            return (
                                <div className="note-item" key={note.time}>
                                    <p className="note-text">{note.content}</p>
                                    <div className='note-time'>
                                        <p>{note.date}</p>
                                        <img src="/images/dot.png" alt="" />
                                        <p>{note.time}</p>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    {/* Write Note  */}
                    <div className="input-container">
                        <textarea placeholder="Enter your text" className="text-area" value={noteContent} onChange={handleNoteChange} />
                        <button
                            disabled={isDisabled}
                            className={`send-icon ${isDisabled ? 'disabled' : ''}`}
                            onClick={handleSendNote}
                            style={{ filter: isDisabled ? 'opacity(0.5)' : 'none' }}
                        >
                            <img src="/images/send.png" alt="Send" width={28} height={28} />
                        </button>
                    </div>

                </div>
            ) : (
                <PreviewContainer />
            )}
        </>
    );
};

export default NoteList;
