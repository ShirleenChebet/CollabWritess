import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ setBooks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, description, genre, status };
    
    axios.post('http://localhost:5000/books', newBook)
      .then(response => {
        alert("Book added succesfully")
        window.location.href="/";
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
      <input type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
