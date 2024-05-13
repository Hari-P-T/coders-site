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
    <div className='container-fluid text-center d-flex flex-row align-items-center justify-content-center' style={{ backgroundColor: "rgb(50, 50, 150)" }}>
      <div className='container text-center' style={{paddingLeft:"350px"}}>
        <div className="d-flex flex-row justify-content-center">
          <div style={{ padding: "10px",paddingRight:"100px" }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px" }} onClick={()=>navigate("/")}>Home</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"100px" }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px" }} onClick={()=>navigate("/leaderboard")}>Leaderboard</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"100px" }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px" }}>Interview</button>
          </div>
          <div style={{ padding: "10px",paddingRight:"100px" }}>
            <button type="button" className="btn btn-outline-info" style={{ width: "150px", height: "50px" }}>About</button>
          </div>
        </div>
      </div>
      <Dropdown data-bs-theme="dark" style={{paddingRight:"70px"}}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{backgroundColor:"rgba(225, 225, 225, 0.2)", width:"150px", borderRadius:"30px", height:"50px"}}>
                  <div className='d-flex flex-row justify-content-center'>
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
