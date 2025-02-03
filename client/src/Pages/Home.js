import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const Home = ({ books, setBooks, onBookSelect }) => {
  return (
    <div>
      <h1>Collab Writes</h1>
      <BookForm setBooks={setBooks} />
      <BookList books={books} onBookSelect={onBookSelect} />
    </div>
  );
};

export default Home;
