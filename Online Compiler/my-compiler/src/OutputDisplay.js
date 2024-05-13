// TextFileReader.js
import React, { useState, useEffect } from 'react';
import raw from './output.txt';

const TextFileReader = () => {
  const [dt, setDt] = useState('');
  const [opt, setOpt] = useState('');

  const op = 'HELLO WORLD!!!';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(raw);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        setDt(text);

        // Check if the fetched output includes the expected output
        if (text===op) {
          console.log('Fetched Text:', text);
          console.log('Expected Output:', op);
          setOpt('Congratulations! You passed.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once after the initial render

  return (
    <>
      <h1>OUTPUT :</h1>
      {dt} <br/>
      <b style={{color:'green'}}>{opt}</b>
    </>
  );
};

export default TextFileReader;

                