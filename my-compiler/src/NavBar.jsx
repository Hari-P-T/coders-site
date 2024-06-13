import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        // Check if user is already authenticated
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/home"); // Redirect to home page if user is authenticated
            }
        });

        // Clean up subscription
        return () => unsubscribe();
    }, [navigate]);

    const onGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log(user);
            navigate("/home"); // Redirect to home page after successful login
        } catch (error) {
            console.error(error.code, error.message);
        }
    };
    return(
        <div className='d-flex flex-row container-fluid mt-4' style={{alignItems:"center", paddingRight:"30px"}} >
            <h3 style={{paddingRight:"20px"}}><span style={{color:"rgb(180, 180, 180)",fontSize:"30px"}}>Code</span><span style={{color:"#00ADB9",fontSize:"30px"}}>Verse</span></h3> <marquee style={{paddingLeft:"20px",paddingRight:"50px",}}>
            The open-source community is celebrating as the Open Source Initiative receives record funding from tech giants and philanthropic organizations. This influx of resources will support the development of open-source software projects, fostering collaboration and innovation across the global coding community.
            </marquee>
            <button className='btn mb-3 mt-3'
            style={{backgroundColor:"#00ADB9",paddingRight:"10px",paddingLeft:"10px",marginLeft:"30px"}}
            onClick={onGoogleLogin}>
                Login
            </button>
        </div>
    );
};

export default Navbar; 