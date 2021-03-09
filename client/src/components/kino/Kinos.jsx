import React, { useState, useEffect } from 'react';

import KinoItem from './KinoItem';
import Spinner from '../layout/Spinner';

import * as API from '../../api';
import axios from 'axios';

const Kinos = () => {
  const [loading, setLoading] = useState(false);
  const [kinos, setKinos] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);

      const res = await API.getPopularMovies();
      const data = await res.json();

      setKinos(data.results);
      setLoading(false);
    };

    fetchAPI();
  }, []);

  return (
    <div>
      {!loading && kinos.length > 0 ? (
        <div id='main'>
          {kinos.map((kino) => (
            <KinoItem kino={kino} key={kino.id} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Kinos;
