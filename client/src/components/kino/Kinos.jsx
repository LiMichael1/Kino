import React, { useState, useEffect } from 'react';

import KinoItem from './KinoItem';
import Spinner from '../layout/Spinner';

const Kinos = () => {
  const [loading, setLoading] = useState(false);
  const [kinos, setKinos] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);

      const res = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=e303bacd98bdfe6244014f8c8f687ec9'
      );

      const data = await res.json();

      setKinos(data.results);
      setLoading(false);
    };

    fetchAPI();
  }, []);

  return (
    <div>
      {!loading ? (
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
