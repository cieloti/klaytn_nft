import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Minting from '../components/Minting/Minting';

const Mint = () => (
  <Main
    title="Minting"
    description="How to mint yourtoken"
  >
    <article className="post markdown" id="about">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/about">Minting page</Link></h2>
          <p>YourToken을 여기서 민팅하실 수 있습니다</p>
        </div>
      </header>
      <Minting />
    </article>
  </Main>
);

export default Mint;
