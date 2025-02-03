import React from 'react';
import BookForm from '../components/BookForm';
import { useNavigate} from "react-router-dom";
const BookForms = ({ books, setBooks, onBookSelect }) => {

  return (
    <div>
      <h1>Add A book</h1>
      <BookForm setBooks={setBooks} />
    </div>
  );
};

export default BookForms;
