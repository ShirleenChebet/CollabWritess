import React, { useState } from 'react';
import axios from 'axios';

const VoteForm = ({ bookId }) => {
  const [voteType, setVoteType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!voteType) return;

    axios.post(`http://localhost:5000/chapters/${bookId}/vote`, { vote_type: voteType })
      .then(response => {
        alert('Vote added');
        setVoteType('');
      })
      .catch(error => console.error('Error adding vote:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Vote on Chapter</h3>
      <select value={voteType} onChange={e => setVoteType(e.target.value)} required>
        <option value="">Select Vote</option>
        <option value="up">Upvote</option>
        <option value="down">Downvote</option>
      </select>
      <button type="submit">Submit Vote</button>
    </form>
  );
};

export default VoteForm;
