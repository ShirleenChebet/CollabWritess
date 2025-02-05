import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import Vote from './pages/Vote';
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import BookForms from './pages/BookForms'
import "./style.css";
const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Function to handle book selection
  const handleBookSelect = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setSelectedBook(book);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home books={books} setBooks={setBooks} onBookSelect={handleBookSelect} />} />
        <Route path="/add" element = {<BookForms/>}/>
        <Route path="/books/:bookId/chapters" element={<Chapters />} />
        <Route path="/books/:bookId/vote" element={<Vote />} />
      </Routes>
    </Router>
  );
};

export default App;
