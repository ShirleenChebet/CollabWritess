import React from 'react';
import axios from 'axios';
const ChapterList = ({ chapters, onVote, onDeleteChapter, onEditChapter }) => {
  if (!chapters || chapters.length === 0) {
    return <p>No chapters available.</p>;
  }
  const handleSaveEdit = (updatedChapter) => {
    const NewName = prompt(`Enter new chapter name for ${updatedChapter.content}`);
    // Save the updated chapter content
    axios.put(`http://127.0.0.1:5000/chapters/${updatedChapter.id}`, { content: NewName })
      .then(response => {
        console.log('Chapter updated:', response.data);
        window.location.href= "";
      })
      .catch(error => console.error('Error saving chapter:', error));
  };
  return (
    <ul>
      {chapters.map(chapter => (
        <li key={chapter.id}>
          <h3>{chapter.title}</h3>
          <p>{chapter.content}</p>
          <p>Votes: {chapter.votes || 0}</p>
          <button onClick={() => onVote(chapter.id, 'up')}>👍 Upvote</button>
          <button onClick={() => onVote(chapter.id, 'down')}>👎 Downvote</button>
          <button onClick={() => onDeleteChapter(chapter.id)}>❌ Delete</button>
          
          {/* Edit button */}
          <button onClick={() => handleSaveEdit(chapter)}>✏️ Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default ChapterList;
