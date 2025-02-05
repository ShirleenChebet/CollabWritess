import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const ChapterForm = ({ bookId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in to add a chapter');
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    const newChapter = { content };

    axios.post(`http://localhost:5000/books/${bookId}/chapters`, newChapter, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      },
    })
      .then(response => {
        setContent('');
        alert('Chapter added');
      })
      .catch(error => {
        setError('Error adding chapter: ' + error.response?.data?.message || error.message);
        console.error('Error adding chapter:', error);
      });
  };

  return (
    <ProtectedRoute>
      <form onSubmit={handleSubmit}>
        <h3>Add Chapter</h3>
        <textarea
          placeholder="Chapter Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Chapter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </ProtectedRoute>
  );
};

export default ChapterForm;
