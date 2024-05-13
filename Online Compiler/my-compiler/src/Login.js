
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();


    const onGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log(user);
            navigate("/");
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    return (
        <>
            <main >
                <section>
                    <div>
                        <p> Coding App </p>

                        <form>
                            <div>
                                <button
                                    onClick={onGoogleLogin}
                                >
                                    Login with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Login;
