import React, { Fragment } from 'react';
import candy_popcorn from './candy_popcorn.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={candy_popcorn}
        alt='Loading...'
        style={{ margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};

export default Spinner;
