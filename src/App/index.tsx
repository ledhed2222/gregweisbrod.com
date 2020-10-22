import React from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
} from 'react-router-dom';

import ContentPortal from './ContentPortal';
import Home from '../Home';
import Projects from '../Projects';
import About from '../About';
import './index.css';

const ROUTES = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const App = () => (
  <div className="App">
    <BrowserRouter>
      <nav className="NavBar">
        <ul>
          { ROUTES.map((route) => (
            <li key={route.path}>
              <NavLink exact to={route.path} activeClassName="currentPage">
                { route.name }
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <ContentPortal>
        { ROUTES.map((route) => (
          <Route exact path={route.path} key={route.path}>
            { route.component }
          </Route>
        ))}
      </ContentPortal>
    </BrowserRouter>
  </div>
);

export default App;
