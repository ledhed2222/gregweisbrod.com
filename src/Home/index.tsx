import React from 'react';

import { Header } from '../components';
import './index.css';

const Home = () => (
  <div className="Home">
    <Header>
      Hi there!
    </Header>
    <Header className="SubHeader">
      Welcome to my little slice of the Internet <span role="img" aria-label="wave">👋</span>
    </Header>
  </div>
);

export default Home;
