
import React, { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
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
                <section>
                    <div>
                        <p> Coding App </p>

                        <form>
                            <div>
                                <button onClick={onGoogleLogin}>
                                    Login with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-sm text-white text-center">
                            No account yet?{' '}
                            <NavLink to="/signup">Sign up</NavLink>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;
