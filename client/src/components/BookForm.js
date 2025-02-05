import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const BookForm = ({ setBooks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in to add a book');
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    const newBook = { title, description, genre, status };

    axios.post('http://localhost:5000/books', newBook, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      },
    })
      .then(response => {
        alert("Book added successfully");
        window.location.href = "/";
      })
      .catch(error => {
        setError('Error adding book: ' + error.response?.data?.message || error.message);
      });
  };

  return (
    <ProtectedRoute>
      <form onSubmit={handleSubmit}>
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </ProtectedRoute>
  );
};

export default BookForm;
