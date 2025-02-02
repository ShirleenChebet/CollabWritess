import React from 'react';

const BookList = ({ books, onBookSelect }) => {
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <span onClick={() => onBookSelect(book.id)}>{book.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
