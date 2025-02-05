import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { Navigate } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
const Home = ({ books, setBooks, onBookSelect }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if token is not found
  }
  return (
    <div>
      <h1>Welcome to CollabWrites.....</h1>
     <p>
    <p>Step into a world where creativity meets collaboration! </p>
    <p>Whether you're an aspiring author or a seasoned writer.</p>
    <p> CollabWrites is your space to craft compelling stories, co-author books, and engage with a passionate community of writers.</p>
    <p>📚 Discover new books</p>
    <p>✍️ Contribute your chapters</p>
    <p>🌟 Vote for the best stories</p>
    <p>💬 Share feedback and grow together</p>


Let your imagination run wild and start your writing journey today! 🚀💖

</p>
      {/* <button className="addbookbtn" onclick={() => navigate('/add')}>Add a book</button> */}
      <BookList books={books} onBookSelect={onBookSelect} />
    </div>
  );
};

export default Home;
