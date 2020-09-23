import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './NavBar';
import Home from '../Home';
import Projects from '../Projects';
import About from '../About';
import './index.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <NavBar />
      <div className="ContentPortal">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
