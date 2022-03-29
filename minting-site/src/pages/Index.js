import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={'Your Token Description'}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">이 사이트에 관하여</Link></h2>
          <p>
            Your Token Description
          </p>
        </div>
      </header>
    </article>
  </Main>
);

export default Index;
