import React, { useState } from 'react';
import axios from 'axios';

const ChapterForm = ({ bookId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChapter = { content };
    
    axios.post(`http://localhost:5000/books/${bookId}/chapters`, newChapter)
      .then(response => {
        setContent('');
        alert('Chapter added');
      })
      .catch(error => console.error('Error adding chapter:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Chapter</h3>
      <textarea placeholder="Chapter Content" value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">Add Chapter</button>
    </form>
  );
};

export default ChapterForm;
