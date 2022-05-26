import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Calendar from './pages/calendar/Calendar';
import TaskList from './pages/taskList/TaskList';
import Home from './pages/home/Home';
import Project from './pages/project/Project';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
   <Router>
    <Navbar/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/calendar" exact>
          <Calendar/>
        </Route>
        <Route path="/project" exact>
          <Project/>
        </Route>
        <Route path="/taskList" exact>
          <TaskList/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
   </Router>
  );
}

export default App;
