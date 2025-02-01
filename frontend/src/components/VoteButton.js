import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './Button.css'; // custom styling

const VoteButton = ({ chapterId }) => {
  const [voteCount, setVoteCount] = useState(0);

  const handleVote = async (voteType) => {
    try {
      const response = await axios.post(`/api/chapters/${chapterId}/vote`, { voteType });
      setVoteCount(response.data.newVoteCount);
    } catch (error) {
      alert('Failed to vote');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => handleVote('upvote')}>
        Upvote
      </Button>
      <Button variant="outlined" onClick={() => handleVote('downvote')}>
        Downvote
      </Button>
      <p>Votes: {voteCount}</p>
    </div>
  );
};

export default VoteButton;
