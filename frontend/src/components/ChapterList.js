import React from 'react';

const ChapterList = ({ chapters, onDeleteChapter, onVote }) => {
  return (
    <div className="chapter-list">
      {chapters.length === 0 ? (
        <p>No chapters available</p>
      ) : (
        chapters.map(chapter => (
          <div key={chapter.id} className="chapter-item">
            <h3>Chapter {chapter.id}</h3>
            <p>{chapter.content}</p>
            <p>Votes: {chapter.votes}</p>
            <button onClick={() => onVote(chapter.id, 'up')}>Upvote</button>
            <button onClick={() => onVote(chapter.id, 'down')}>Downvote</button>
            <button onClick={() => onDeleteChapter(chapter.id)}>Delete Chapter</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChapterList;
