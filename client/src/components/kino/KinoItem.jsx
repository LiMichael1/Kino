import React from 'react';
import { Link } from 'react-router-dom';

// const url = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
const url = 'https://image.tmdb.org/t/p/w500/';

const KinoItem = ({ kino: { poster_path, title, release_date, id } }) => {
  return (
    <div className='kino'>
      <Link to={`/m/${id}`}>
        <img src={url + poster_path} alt='' />
      </Link>
      {/* <div className='kino-info'>
        <h3>{title}</h3>
        <h4>{release_date}</h4>
      </div> */}
    </div>
  );
};

export default KinoItem;
