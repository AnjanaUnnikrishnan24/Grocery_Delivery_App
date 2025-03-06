import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';

const SignIn = () => {
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: useremail,
                    Password: password
                }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Login failed');
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid credentials: Please try again!');
        }
    };

    return (
        <>
            <UserNavBar />
            <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
                <form onSubmit={handleSignIn} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-gray-700 text-center">Sign In</h2>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                value={useremail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Enter your registered email address"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-600"
                    >
                        Login
                    </button>
                </form>

                {/* Properly positioned Sign Up link */}
                <p className="text-sm text-gray-600 text-center mt-4">
                    Don't have an account?  
                    <Link to='/signup' className="text-green-500 hover:underline ml-1">Sign Up</Link>
                </p>
            </div>
        </>
    );
};

export default SignIn;
