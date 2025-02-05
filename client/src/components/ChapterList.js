import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
const ChapterList = ({ chapters, onVote, onDeleteChapter, onEditChapter }) => {
  const navigate = useNavigate();

  if (!chapters || chapters.length === 0) {
    return <p>No chapters available.</p>;
  }

  const handleSaveEdit = (updatedChapter) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('You must be logged in to edit a chapter');
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const newName = prompt(`Enter new chapter name for ${updatedChapter.content}`);
    if (!newName) return; // If no name is entered, do not proceed

    axios.put(`http://127.0.0.1:5000/chapters/${updatedChapter.id}`, { content: newName }, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the JWT token in the request header
      },
    })
      .then(response => {
        console.log('Chapter updated:', response.data);
        window.location.reload(); // Reload the page to show updated chapter content
      })
      .catch(error => {
        console.error('Error saving chapter:', error);
        alert('Error updating chapter');
      });
  };

  const handleDeleteChapter = (chapterId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('You must be logged in to delete a chapter');
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    axios.delete(`http://127.0.0.1:5000/chapters/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the JWT token in the request header
      },
    })
      .then(response => {
        console.log('Chapter deleted:', response.data);
        onDeleteChapter(chapterId);
        window.location.href = ""; // Remove the chapter from the list after deletion
      })
      .catch(error => {
        console.error('Error deleting chapter:', error);
        alert('Error deleting chapter');
      });
  };

  return (
    <ul>
      {chapters.map(chapter => (
        <li key={chapter.id}>
          <h3>{chapter.title}</h3>
          <h4>{chapter.content}</h4>
          <h4>Votes: {chapter.votes || 0}</h4>
          <button onClick={() => onVote(chapter.id, 'up')}>👍 Upvote</button>
          <button onClick={() => onVote(chapter.id, 'down')}>👎 Downvote</button>
          <button onClick={() => handleDeleteChapter(chapter.id)}>❌ Delete</button>

          {/* Edit button */}
          <button onClick={() => handleSaveEdit(chapter)}>✏️ Edit</button>
        </li>
      ))}

    </ul>
  );
};

export default ChapterList;
