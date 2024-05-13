
import React, { useState ,useEffect} from 'react';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Header from './Header';
import { auth } from './firebase';


const Problem1 = () => {

  const user = auth.currentUser
  const userEmail=user.email;
  const [status, setStatus] = useState('');
  const problemNo = 1;
  const difficulty="easy";

  useEffect(() => {
      const fetchSixthProblemStatus = async () => {
          try {
              // Fetch user data from the backend
              const response = await fetch(`http://localhost:4000/api/getUserByEmail/${userEmail}`);
              if (response.ok) {
                  const userData = await response.json();
                  const completedProblems = userData.completed;

                  // Check if the 6th problem is completed
                  const status = completedProblems.includes(problemNo) ? 'Completed' : 'Pending';
                  setStatus(status);
              } else {
                  console.error('Failed to fetch user data.');
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchSixthProblemStatus();
  }, []);

  const leaderUpdate = async (email) => {
    try {
      const res = await fetch('http://localhost:4000/api/incrementCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (res.ok) {
        console.log('Count incremented successfully.');
      } else {
        console.error('Failed to increment count:', res.statusText);
      }
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };
  
  

  const [completedProblems, setCompletedProblems] = useState([]);
  const handleCompleteProblem = async () => {
    try {
        if (!completedProblems.includes(problemNo)) {
            // Update the completedProblems array in the state
            setCompletedProblems(prevCompletedProblems => [...prevCompletedProblems, problemNo]);
            
            // Update the completedProblems array in the database
            const response = await fetch('http://localhost:4000/api/updateCompletedProblems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail, problemId: problemNo , difficulty:difficulty})
            });
            
            if (response.ok) {
                console.log('Problem marked as completed successfully.');
            } else {
                console.error('Failed to mark problem as completed.');
            }
            console.log("called leader update with : "+userEmail);
            leaderUpdate(userEmail);
        } else {
            console.log('Problem is already completed.');
        }
    } catch (error) {
        console.error('Error marking problem as completed:', error);
    }
};



  const [fileContent, setFileContent] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('.py');
  const [outputFilePath, setOutputFilePath] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('HELLO WORLD!!!');
  const [inp, setInp] = useState('Upload File Here');
  const [inpclr, setInpclr] = useState("#0b468c");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };

    reader.readAsText(file);
    setInp("File Uploaded");
    setInpclr("green")
  };

  const handleExtensionChange = (event) => {
    setSelectedExtension(event.target.value);
  };

  const handleCompileClick = async () => {
    const response = await fetch('http://localhost:3001/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: fileContent,
        extension: selectedExtension,
      }),
    });

    if (response.ok) {
      const output = await response.text();
      setOutputFilePath(output);

      if (output.trim() === expectedOutput) {
        setMessage('Congratulations! You passed.');
        setMessageColor('green');
        handleCompleteProblem();
        setStatus("Completed");
      } else {
        // setMessage(`Sorry, try again. Expected: ${expectedOutput}, Actual: ${output}`);
        setMessage("Test Cases failed");
        setMessageColor('red');
        
      }
    } else {
      console.error('Compilation failed:', response.statusText);
    }
  };

  return (
      <div className="d-flex align-items-center vh-100 flex-column" style={{ backgroundColor: "#1d1969" }}>
        <Header/> <br/>
        <h2 style={{color:"white"}}><b>1</b>  - <span style={{color:"#f76c1b"}}>Basic Hello World</span> <span style={{paddingLeft:"100px",color:"yellow"}}>Completion Status : </span><span>{status}</span></h2> 
        <div className="container border border-grey rounded-4 p-4" style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-8" style={{backgroundColor:"rgba(0, 0, 0, 0.5)",padding: "20px",borderRadius: "20px"}}>
              <h4 style={{color: "#ff00a0"}}>Problem Statement :</h4><br/>
              <div>
                <h6 style={{ color: 'cyan'}}>Write a simple program to print <b style={{ color: '#7a04eb'}}>{expectedOutput}</b></h6> <br/>
                <p style={{color:"gray"}}>/*<br/>*<br/>*<br/>*<br/>*<br/>*<br/>*<br/>*/</p>
              </div>
            </div>
            <div className='col-1'></div>
            <div className="col-3 align-items-center justify-content-center d-flex flex-column" style={{backgroundColor:"rgba(225, 225, 225, 0.2)",padding: "20px",borderRadius: "20px"}}>
              <div style={{backgroundColor:inpclr, border: "2px dashed cyan", width:"150px",paddingBottom:"25px"}} className="d-flex align-items-center justify-content-center flex-column">
                <input type="file" onChange={handleFileChange} style={{backgroundColor: "gold", opacity:0}} id="customFile"/>
                <label className="custom-file-label" style={{color: "cyan"}} for="customFile">{inp}</label>
              </div> 
              <br />
              <label className="form-label">
                <h5 style={{color:"cyan"}}><b>Select Language:</b></h5>
                <select className="form-select" value={selectedExtension} onChange={handleExtensionChange}>
                  <option value=".py">Python</option>
                  <option value=".js">JavaScript</option>
                  <option value=".cpp">C++</option>
                  <option value=".java">Java</option>
                </select>
              </label>

              <br />
              <button onClick={handleCompileClick} className='btn btn-info'>Compile</button>
            </div>
          </div> <br/>
          <div className="row">
            <div className="col-8" style={{backgroundColor:"rgba(225, 225, 225, 0.2)",padding: "20px",borderRadius: "20px", paddingTop:"20px"}}>
              <div className='row' style={{color: "white"}}>
                <div className='col-6'>
                  <h4><b>Test Case 1:</b></h4><br/>
                  <h6><b>Input : </b><br/><br/><p style={{color: "gray"}}>***nill***</p></h6> <br/>
                  <h6><b>Expected Output : </b><br/><br/><p style={{color: "white"}}>HELLO WORLD!!!</p></h6>
                </div>
                <div className='col-6'>
                  <h4><b>Test Case 2:</b></h4><br/>
                  <h6><b>Input : </b><br/><br/><p style={{color: "gray"}}>***nill***</p></h6> <br/>
                  <h6><b>Expected Output : </b><br/><br/><p style={{color: "gray"}}>***nill***</p></h6>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-3 d-flex align-items-center flex-column" style={{backgroundColor:"rgba(0, 0, 0, 0.5)",padding: "30px",borderRadius: "20px", paddingTop:"80px"}}>
              <h3 style={{color: "white"}}>Validation Status : </h3><br/>
              <h2 style={{ color: messageColor }}><b>{message}</b></h2>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Problem1;
