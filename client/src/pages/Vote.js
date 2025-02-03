import React from 'react';
import { useParams } from 'react-router-dom';
import VoteForm from '../components/VoteForm';

const Vote = () => {
  const { bookId } = useParams();

  return (
    <div>
      <h2>Vote for Chapters</h2>
      <VoteForm bookId={bookId} />
    </div>
  );
};

export default Vote;
