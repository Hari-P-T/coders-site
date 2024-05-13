import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

const Signup = () => {
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
            <section>
                <div>
                    <div>
                        <h1>Coding App</h1>
                        <form>
    
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                            >
                                Sign up with Google
                            </button>
                        </form>
    
                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Signup;