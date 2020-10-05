import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import NavBar from './NavBar';
import ContentPortal from './ContentPortal';
import Home from '../Home';
import Projects from '../Projects';
import About from '../About';
import './index.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <NavBar />
      <ContentPortal>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </ContentPortal>
    </BrowserRouter>
  </div>
);

export default App;
