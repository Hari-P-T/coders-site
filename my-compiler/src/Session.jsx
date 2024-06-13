// import React,{useEffect,useState} from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Rectangle,
//   PieChart,
//   Pie,
//   ResponsiveContainer,
//   Cell 
// } from "recharts";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { auth } from './firebase';


// const npo=9;


// export default function App() {
//   const user = auth.currentUser
//   const userEmail=user.email;
//   const [easy, setEasy] = useState('');
//   const [medium, setMedium] = useState('');
//   const [hard, setHard] = useState('');
//   const [tot, setTot] = useState('');

//   useEffect(() => {
//     const fetchSixthProblemStatus = async () => {
//         try {
//             // Fetch user data from the backend
//             const response = await fetch(`http://localhost:4000/api/getUserByEmail/${userEmail}`);
//             if (response.ok) {
//                 const userData = await response.json();
//                 const es=userData.easy;
//                 const md=userData.medium;
//                 const hd=userData.hard;
//                 setEasy(es);
//                 setMedium(md);
//                 setHard(hd);
//                 const t=es+md+hd;
//                 setTot(t);
//             } else {
//                 console.error('Failed to fetch user data.');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     fetchSixthProblemStatus();
// }, []);

// const data = [
//   {
//     name: "Easy",
//     Completed:easy,
//     Total: 5,
//     amt: 0,
//   },
//   {
//     name: "Medium",
//     Completed: medium,
//     Total: 2,
//     amt: 0,
//   },
//   {
//     name: "Hard",
//     Completed: hard,
//     Total: 2,
//     amt: 0,
//   },
// ];

//   return (
//     <div className=" text-center d-flex flex-row align-items-center">
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar
//           dataKey="Completed"
//           fill="#8884d8"
//           activeBar={<Rectangle fill="red" stroke="blue" />}
//         />
//         <Bar
//           dataKey="Total"
//           fill="#82ca9d"
//           activeBar={<Rectangle fill="gold" stroke="blue" />}
//         />
//       </BarChart>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell 
} from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';

const npo = 9; // Assuming npo represents the total number of problems

export default function App() {
  const user = auth.currentUser;
  const userEmail = user.email;
  const [easy, setEasy] = useState('');
  const [medium, setMedium] = useState('');
  const [hard, setHard] = useState('');
  const [tot, setTot] = useState('');

  useEffect(() => {
    const fetchUserProblems = async () => {
      try {
        // Fetch user data from the backend
        const response = await fetch(`http://localhost:4000/api/getUserByEmail/${userEmail}`);
        if (response.ok) {
          const userData = await response.json();
          const es = userData.easy;
          const md = userData.medium;
          const hd = userData.hard;
          setEasy(es);
          setMedium(md);
          setHard(hd);
          const t = es + md + hd;
          setTot(t);
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProblems();
  }, []);

  const data = [
    {
      name: "Easy",
      Completed: easy,
      Total: 5,
      amt: 0,
    },
    {
      name: "Medium",
      Completed: medium,
      Total: 2,
      amt: 0,
    },
    {
      name: "Hard",
      Completed: hard,
      Total: 2,
      amt: 0,
    },
  ];

  const data02 = [
    { name: 'Completed', value: tot, color: '#00ADB9' },
    { name: 'Pending', value: npo - tot, color: '#79b6f2' }
  ];

  return (
    <div className=" text-center d-flex flex-row align-items-center flex-wrap" style={{ border:"5px solid #00ADB9", borderRadius:"20px"}}>
      <div style={{borderRight: "3px solid black"}}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Completed"
            // fill="#FFA500"
            fill='#79b6f2'
            activeBar={<Rectangle fill="red" stroke="blue" />}
          />
          <Bar
            dataKey="Total"
            fill="#00ADB9"
            activeBar={<Rectangle fill="orange" stroke="blue" />}
          />
        </BarChart>
      </div>
      <div>      
        <br /> <br />
        <h1 style={{textAlign:"center"}}>Completed : {tot} / {npo}</h1>
        <PieChart width={400} height={400}>
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            label
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div style={{marginLeft:"5px"}}>
        <div style={{width:"10px", height:"10px", backgroundColor:"#00ADB9"}}></div> <p>Completed</p>
        <div style={{width:"10px", height:"10px", backgroundColor:"#79b6f2"}}></div> <p style={{marginRight:"20px"}}>Pending</p>
      </div>

    </div>
  );
}
