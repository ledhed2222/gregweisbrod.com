import React from 'react';

import { Header } from '../components';
import './index.css';

const Home = () => (
  <div className="Home">
    <Header>
      Hi there!
    </Header>
    <Header className="SubHeader">
      Welcome to my site
    </Header>
  </div>
);

export default Home;
