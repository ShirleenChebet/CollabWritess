import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import ChapterSubmit from './components/ChapterSubmit';
import FeedbackForm from './components/FeedbackForm';
import VoteButton from './components/VoteButton';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/explore" component={Explore} />
          <Route path="/submit-chapter/:bookId" component={ChapterSubmit} />
          <Route path="/feedback/:chapterId" component={FeedbackForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
