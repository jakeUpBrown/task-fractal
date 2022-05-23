import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Calendar from './pages/Calendar/Calendar';
import TaskList from './pages/TaskList/TaskList';
import Home from './pages/Home/Home';
import Task from './pages/Task/Task';
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
        <Route path="/task" exact>
          <Task/>
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
