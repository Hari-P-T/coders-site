import LoginNavbar from './LoginNavBar';
import React, { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const styles = `
  .gradient-heading {
    background-image: linear-gradient(to right, #ff5f6d, #ffc371); /* Gradient colors */
    -webkit-background-clip: text; /* Clip text to the background area */
    -webkit-text-fill-color: transparent; /* Hide the text color */
    margin: 0; /* Remove default margin */
    padding: 20px; /* Add some padding for better visualization */
  }
`;
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

    return (
        <>
            <main>
                <LoginNavbar/>
                <section className='signup template d-flex justify-content-center align-items-center 100-w vh-100 '>
                    <div className='40-w p-5 rounded '>
                        <form>
                        <div className='align-items-center justify-content-center text-center'>
                        <p className='d-flex align-items-center justify-content-center h1 fw-bold  align-middle'style={{color:"rgb(180, 180, 180)",fontSize:"60px"}}>Code<span style={{color:"#00ADB9"}}>Verse</span></p>
                        <div className='mb-3 mt-2 d-flex align-items-center justify-content-center fs-3 fw-normal '> Challenge, Compete, Conquer</div>

                        <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
                            <style>{styles}</style>
                            <p className='fw-bold fs-1 mb-0 gradient-heading'>Hello Coder! Welcome to the CodeVerse,<br/> the place for your coding career. </p>
                        </div>
                            <div className='d-grid'>
                                <button className='btn mb-3'
                                onClick={onGoogleLogin}
                                style={{backgroundColor:"#00ADB9"}}>
                                    Login with Google
                                </button>
                            </div>

                        <p className="text-sm text-white text-center">
                            No account yet?{' '}
                            <NavLink to="/signup">Sign up</NavLink>
                        </p>
                        </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;
