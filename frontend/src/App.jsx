import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import UserTodos from './views/UserTodos';

function App() {
  return (
    <Router>
      <Routes>
        {/* Omdirigera från "/" till "/users" */}
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Home />} />
        <Route path="/user/:userId/todos" element={<UserTodos />} />
      </Routes>
    </Router>
  );
}

export default App;
