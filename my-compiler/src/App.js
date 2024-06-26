import React from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Problem1 from './Problem1';
import Leaderboard from './LeaderBoard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Router>
            <div >
                <section >
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/problem1" element={<Problem1 />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                </section>
            </div>
        </Router>
    );
}

export default App;
