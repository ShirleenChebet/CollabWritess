import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ChapterForm from './components/ChapterForm';
import ChapterList from './components/ChapterList'; // New component to list chapters
import VoteForm from './components/VoteForm';
import './style.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);

  // Fetch all books
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Fetch chapters for the selected book
  useEffect(() => {
    if (selectedBook) {
      axios.get(`http://127.0.0.1:5000/books/${selectedBook.id}/chapters`)
        .then(response => setChapters(response.data))
        .catch(error => console.error('Error fetching chapters:', error));
    }
  }, [selectedBook]);

  const handleBookSelect = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setSelectedBook(book);
  };

  const handleChapterDelete = (chapterId) => {
    axios.delete(`http://127.0.0.1:5000/chapters/${chapterId}`)
      .then(response => {
        setChapters(chapters.filter(chapter => chapter.id !== chapterId));
        console.log('Chapter deleted:', response.data);
      })
      .catch(error => console.error('Error deleting chapter:', error));
  };

  const handleVote = (chapterId, voteType) => {
    axios.post(`http://127.0.0.1:5000/chapters/${chapterId}/vote`, { vote_type: voteType })
      .then(response => {
        // Update chapter votes count
        const updatedChapters = chapters.map(chapter => 
          chapter.id === chapterId ? { ...chapter, votes: chapter.votes + (voteType === 'up' ? 1 : -1) } : chapter
        );
        setChapters(updatedChapters);
        console.log('Vote added:', response.data);
      })
      .catch(error => console.error('Error adding vote:', error));
  };

  return (
    <div className="app">
      <h1>Collab Writes</h1>
      <BookForm setBooks={setBooks} />
      <div className="book-list">
        <BookList books={books} onBookSelect={handleBookSelect} />
      </div>
      {selectedBook && (
        <>
          <h2>Chapters for {selectedBook.title}</h2>
          <ChapterForm bookId={selectedBook.id} />
          
          {/* Display existing chapters */}
          <ChapterList 
            chapters={chapters}
            onDeleteChapter={handleChapterDelete}
            onVote={handleVote}
          />

          <VoteForm bookId={selectedBook.id} />
        </>
      )}
    </div>
  );
};

export default App;
