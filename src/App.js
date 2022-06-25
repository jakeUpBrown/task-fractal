import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Calendar from './pages/Calendars/Calendar';
import TaskList from './pages/taskList/TaskList';
import Home from './pages/home/Home';
import Project from './pages/project/Project';
import Navbar from './Components/Navbar/Navbar';
import ProjectList from './pages/projectList/ProjectList';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />} />
          <Route
            path="/calendar"
            element={<Calendar />} />
          <Route
            path="/project/:projectId"
            element={<Project />} />
          <Route
            path="/projectList"
            element={<ProjectList />} />
          <Route
            path="/taskList"
            element={<TaskList />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
