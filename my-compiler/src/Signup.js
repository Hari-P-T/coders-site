import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import './style.css';
import Navbar from './NavBar';



const Signup = () => {
    const styles = `
  .gradient-heading {
    background-image: linear-gradient(to right, #ff5f6d, #ffc371); /* Gradient colors */
    -webkit-background-clip: text; /* Clip text to the background area */
    -webkit-text-fill-color: transparent; /* Hide the text color */
    margin: 0; /* Remove default margin */
    padding: 20px; /* Add some padding for better visualization */
  }
`;
    const [ename, setEname] = useState('');
    const navigate = useNavigate();

    const addT0Mongo = async (userEmail, iname) => {
        try {
            const response = await fetch('http://localhost:4000/api/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail }) // Use userEmail instead of email
            });
    
            if (response.ok) {
                console.log('User inserted successfully.');
            } else {
                console.error('Failed to insert user.');
            }
        } catch (error) {
            console.error('Error inserting user:', error);
        }

        try {
            const response = await fetch('http://localhost:4000/api/insertEntity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail, name: iname, count: 0}) // Use userEmail instead of email
            });
    
            if (response.ok) {
                console.log('User inserted successfully.');
            } else {
                console.error('Failed to insert user.');
            }
        } catch (error) {
            console.error('Error inserting user:', error);
        }

    };
    

    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const usr = userCredential.user;
            const email=usr.email;
            const name=usr.displayName;
            setEname(usr.displayName);
            addT0Mongo(email,name);
            navigate("/login");
        } catch (error) {
            console.error(error.code, error.message);
            }
    };
    return (
        <main>
            <Navbar/>
            <section className='signup template d-flex justify-content-center align-items-center 100-w vh-100 ' >
                <div className='40-w p-5 rounded '>
                    <form>
                    <div className='align-items-center justify-content-center text-center'>
                        
                        <p className='d-flex align-items-center justify-content-center h1 fw-bold mt-2 align-middle'style={{color:"rgb(180, 180, 180)",fontSize:"60px"}}>Code<span style={{color:"#00ADB9"}}>Verse</span></p>
                        <div className='mb-3 mt-2 d-flex align-items-center justify-content-center fs-3 fw-normal '> Challenge, Compete, Conquer</div>
                        <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
                            <style>{styles}</style>
                            <p className='fw-bold fs-1 mb-0 gradient-heading'>The only way to learn to code <br/> is to Code !</p>
                        </div>
                        <div>
                            <p style={{width:"80vh",paddingTop:"10px",paddingBottom:"30px"}}>Welcome to CodeVerse, where every coder becomes an explorer, seeking knowledge in the vast expanse of algorithms and logic. Compete not just with others, but with yourself, in the CodeVerse arena where growth is the ultimate prize.</p>
                        </div>
                        
                        <div className='d-grid'>
                            <button className='btn mb-3'
                            type="button"
                            onClick={handleGoogleSignup}
                            style={{backgroundColor:"#00ADB9"}}>
                                Sign Up with Google
                            </button>

                        </div>
                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Login here
                            </NavLink>
                        </p>
                            <div>
                            <p>We help coders to solve problems which will make them to get placed in a top companies.</p>
                        </div>
                        
                    </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Signup;