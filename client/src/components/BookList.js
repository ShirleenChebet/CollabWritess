import React from 'react';
import { useNavigate} from "react-router-dom";
import "./BookList.css"
const BookList = ({ books, onBookSelect }) => {
  const Navigate = useNavigate();
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <span onClick={() => Navigate(`/books/${book.id}/chapters`)}>{book.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
