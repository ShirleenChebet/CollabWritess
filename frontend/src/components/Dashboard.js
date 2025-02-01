import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Button.css'; // custom styling

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="dashboard">
      <h1>Your Books</h1>
      <Link to="/create-book">
        <Button variant="contained" color="primary">
          Create New Book
        </Button>
      </Link>
      <div className="books-list">
        {books.map((book) => (
          <Card key={book.id} className="book-card">
            <CardContent>
              <Typography variant="h5">{book.title}</Typography>
              <Typography variant="body2">{book.description}</Typography>
              <Button variant="contained" color="secondary">
                <Link to={`/book/${book.id}`}>View/Edit</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
