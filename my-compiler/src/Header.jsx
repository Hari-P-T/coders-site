import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
          let firstName = currentUser.displayName || 'User';
          firstName=firstName.split(' ')
          firstName=firstName[0];
          const userPhotoURL = currentUser.photoURL || ''; 
          setUserName(firstName);
          setPhotoURL(userPhotoURL);
      } else {
          navigate("/login");
      }
  }, [navigate]);
  const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
        });
    }
  return (
    <div className='d-flex flex-row container-fluid mt-4 ' style={{alignItems:"center", paddingRight:"30px"}}>
      <div style={{width:"1190px"}} >
        <div className="d-flex flex-row justify-content-center">
        <h3 style={{paddingRight:"20px",marginLeft:"10px",marginTop:"10px"}}><span style={{color:"rgb(180, 180, 180)",fontSize:"30px"}}>Code</span><span style={{color:"#00ADB9",fontSize:"30px"}}>Verse</span></h3>
          <div style={{ padding: "10px",paddingRight:"20px",paddingLeft:"50px"  }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px",color:"white"  }} onClick={()=>navigate("/home ")}>Home</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"50px",paddingLeft:"50px"   }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px",color:"white" }} onClick={()=>navigate("/leaderboard")}>Leaderboard</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"50px",paddingLeft:"50px"}}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px" ,color:"white" }}>Interview</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"50px",paddingLeft:"50px"   }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px",color:"white"  }}>About</button>
          </div>
        </div>
      </div>
      <Dropdown data-bs-theme="dark" style={{width:"200px"}}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{backgroundColor:"rgba(225, 225, 225, 0.2)", width:"190px", borderRadius:"30px", height:"50px"}}>
                  <div className='d-flex flex-row justify-content-center'style={{justifyContent:"flex-end"}}>
                      {photoURL && <img src={photoURL} alt="Profile" style={{ width: "40px",height:"40px",borderRadius:"30px"}}/>}
                      <p style={{color:"white", paddingTop:"8px", paddingLeft:"10px"}}>{userName}</p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                
                <Dropdown.Item href="#/action-2">View Stats</Dropdown.Item>
                <Dropdown.Item>Toggle Theme</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item  onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    </div>
  )
}
