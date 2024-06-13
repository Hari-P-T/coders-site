import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Chart from './Session';

const ProblemList = () => {
    const user = auth.currentUser
    const userEmail=user.email;
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                
                const response = await fetch(`http://localhost:4000/api/getUserByEmail/${userEmail}`);
                
                if (response.ok) {
                    const userData = await response.json();
                    const completedProblems = userData.completed;
                    
                    const problemData = [
                        { id: 1, title: "Problem 1", difficulty: "Easy" },
                        { id: 2, title: "Problem 2", difficulty: "Medium" },
                        { id: 3, title: "Problem 3", difficulty: "Medium" },
                        { id: 4, title: "Problem 4", difficulty: "Easy" },
                        { id: 5, title: "Problem 5", difficulty: "Medium" },
                        { id: 6, title: "Problem 6", difficulty: "Hard" },
                        { id: 7, title: "Problem 7", difficulty: "Easy" },
                        { id: 8, title: "Problem 8", difficulty: "Hard" }
                        
                    ];
                    
                    const updatedProblems = problemData.map(problem => ({
                        ...problem,
                        status: completedProblems.includes(problem.id) ? "Completed" : "Pending"
                    }));
                    
                    setProblems(updatedProblems);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleClick = (problemId) => {
        navigate(`/problem${problemId}`);
    };

    return (
        <div>
            
            <div className="container" style={{ width: "1100px", /*boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff" ,*/marginTop: "50px", marginBottom: "50px", borderRadius: "20px"}}>
                <h2 style={{ paddingTop: "10px" }}>User Session Chart</h2><br />
                <Chart/>
            </div>
            <div className="container">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "#00ADB9" }}>#</th>
                            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "#5fb3b3" }}>Title</th>
                            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "#00ADB9" }}>Difficulty</th>
                            <th scope="col" style={{ height: "50px", color: "white", backgroundColor: "#5fb3b3" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr key={index} onClick={() => handleClick(problem.id)} >
                                <th scope="row"style={{backgroundColor:"rgb(180, 180, 180)"}}>{index + 1}</th>
                                <td style={{backgroundColor:"rgb(180, 180, 180)"}}>{problem.title}</td>
                                <td style={{backgroundColor:"rgb(180, 180, 180)"}}>{problem.difficulty}</td>
                                <td style={{backgroundColor:"rgb(180, 180, 180)"}}>{problem.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProblemList;
