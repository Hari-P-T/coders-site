import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/leaderboard')
    .then(response => {
        setLeaderboard(response.data);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  return (
    <div>
        <Header/>
      <h1>Leaderboard</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "black" }}>Rank</th>
            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "black" }}>Email</th>
            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "black" }}>Count</th>
            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "black" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.email}</td>
              <td>{item.count}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

