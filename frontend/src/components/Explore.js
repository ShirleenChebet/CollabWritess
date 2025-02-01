import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import './Button.css'; // custom styling

const Explore = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`/api/books?search=${search}`);
      setBooks(response.data);
    };

    fetchBooks();
  }, [search]);

  return (
    <div className="explore">
      <h1>Explore Books</h1>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <Button variant="outlined">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
