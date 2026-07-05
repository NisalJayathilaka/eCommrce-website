import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const tempErrors: { email?: string; password?: string } = {};
        
        // Email validation
        if (!email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!password) {
            tempErrors.password = 'Password is required';
        } else if (password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        
        if (validate()) {
            const registeredUsersStr = localStorage.getItem('registered_users');
            let registeredUsers = [];
            try {
                registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
            } catch {
                registeredUsers = [];
            }

            if (isSignUp) {
                // Check if user already exists in localStorage
                const userExists = registeredUsers.some(
                    (u: any) => u.email.toLowerCase() === email.toLowerCase()
                );
                if (userExists) {
                    setErrors({ email: 'This email is already registered.' });
                    return;
                }

                // Save new user to localStorage
                const newUser = { email, password };
                registeredUsers.push(newUser);
                localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

                // Log in and redirect
                login(email);
                navigate('/');
            } else {
                // Verify user details in localStorage
                const user = registeredUsers.find(
                    (u: any) => u.email.toLowerCase() === email.toLowerCase()
                );
                if (!user || user.password !== password) {
                    setErrors({ email: 'Invalid email or password.' });
                    return;
                }

                // Log in and redirect
                login(email);
                navigate('/');
            }
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setEmail('');
        setPassword('');
        setErrors({});
        setSubmitted(false);
    };

    return (
        <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {isSignUp ? 'Create your account' : 'Sign in to your account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {isSignUp ? 'Join ShopHub to start shopping!' : 'Welcome back, please enter your details.'}
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (submitted) validate();
                                }}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-450 focus:outline-none focus:ring-2 text-sm ${
                                    errors.email 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900' 
                                        : 'border-gray-300 focus:ring-[#003366] focus:border-[#003366] text-gray-900'
                                }`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-600 font-medium" id="email-error">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (submitted) validate();
                                }}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-450 focus:outline-none focus:ring-2 text-sm ${
                                    errors.password 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900' 
                                        : 'border-gray-300 focus:ring-[#003366] focus:border-[#003366] text-gray-900'
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600 font-medium" id="password-error">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#003366] hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] transition-colors cursor-pointer"
                        >
                            {isSignUp ? 'Sign up' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="text-center pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        {isSignUp ? (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="font-semibold text-[#003366] hover:underline cursor-pointer focus:outline-none"
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="font-semibold text-[#003366] hover:underline cursor-pointer focus:outline-none"
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}