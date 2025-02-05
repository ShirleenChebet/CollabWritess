import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
const VoteForm = ({ chapterId }) => {
  const [voteType, setVoteType] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!voteType) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in to vote');
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    axios.post(`http://localhost:5000/chapters/${chapterId}/vote`, { vote_type: voteType }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      },
    })
      .then(response => {
        alert('Vote added');
        setVoteType('');
      })
      .catch(error => {
        setError('Error adding vote: ' + error.response?.data?.message || error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Vote on Chapter</h3>
        <select value={voteType} onChange={e => setVoteType(e.target.value)} required>
          <option value="">Select Vote</option>
          <option value="up">Upvote</option>
          <option value="down">Downvote</option>
        </select>
        <button type="submit">Submit Vote</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VoteForm;
