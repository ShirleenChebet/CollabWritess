import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChapterForm from '../components/ChapterForm';
import ChapterList from '../components/ChapterList';

const Chapters = () => {
  const { bookId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [bookTitle, setBookTitle] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/books/${bookId}`)
      .then(response => setBookTitle(response.data.title))
      .catch(error => console.error('Error fetching book:', error));

    axios.get(`http://127.0.0.1:5000/books/${bookId}/chapters`)
      .then(response => setChapters(response.data))
      .catch(error => console.error('Error fetching chapters:', error));
  }, [bookId]);

  const handleDelete = (chapterId) => {
    axios.delete(`http://127.0.0.1:5000/chapters/${chapterId}`)
      .then(() => setChapters(chapters.filter(chapter => chapter.id !== chapterId)))
      .catch(error => console.error('Error deleting chapter:', error));
  };

  const handleVote = (chapterId, voteType) => {
    axios.post(`http://127.0.0.1:5000/chapters/${chapterId}/vote`, { vote_type: voteType })
      .then(response => {
        setChapters(chapters.map(chapter =>
          chapter.id === chapterId
            ? { ...chapter, votes: (chapter.votes || 0) + (voteType === 'up' ? 1 : -1) }
            : chapter
        ));
        console.log('Vote successful:', response.data);
      })
      .catch(error => console.error('Error voting:', error));
  };

  return (
    <div>
      <h2>Chapters for {bookTitle}</h2>
      <ChapterForm bookId={bookId} />
      <ChapterList 
        chapters={chapters} 
        onVote={handleVote} 
        onDeleteChapter={handleDelete} 
      />
    </div>
  );
}
export default Chapters