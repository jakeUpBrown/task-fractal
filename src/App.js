import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Calendar from './pages/calendar/Calendar';
import TaskList from './pages/tasklist/TaskList';
import store from "./pages/pomodoro/redux/store";
import Settings from "./pages/pomodoro/components/Settings";
import { Provider } from "react-redux";
import Home from './pages/home/Home';
import Project from './pages/project/Project';
import Navbar from './Components/Navbar/Navbar';
import ProjectList from './pages/projectList/ProjectList';

import './App.css';
import Pomodoro from './pages/pomodoro/Pomodoro';
import Report from './pages/pomodoro/components/Report';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <main id='app-container'>
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
              path="/pomodoro"
              element={<Pomodoro />} />
            <Route
              path="/settings"
              element={<Settings />} />
            <Route
                path="/report"
                element={<Report />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
