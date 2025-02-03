import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useNavigate} from "react-router-dom";
const Home = ({ books, setBooks, onBookSelect }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Collab Writes</h1>
      {/* <button className="addbookbtn" onclick={() => navigate('/add')}>Add a book</button> */}
      <BookList books={books} onBookSelect={onBookSelect} />
    </div>
  );
};

export default Home;
