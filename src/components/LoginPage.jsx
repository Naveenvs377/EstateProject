import React, { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId === 'admin' && password === '2025') {
            setError('');
            onLogin();
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
         <div className="bg-gray-900 flex flex-col justify-center items-center h-screen font-sans">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/512px-Bharatiya_Janata_Party_logo.svg.png"
                        alt="BJP Logo" 
                        className="w-20 h-20 mx-auto mb-4"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80/F97316/FFFFFF?text=BJP&font=sans'; }}
                    />
                    <h1 className="text-3xl font-bold text-orange-500">Mission 2025</h1>
                    <p className="text-gray-400">Kerala Election Dashboard Login</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                         <div className="absolute top-3.5 left-3 text-gray-400">
                             <User size={20} />
                         </div>
                         <input
                            type="text"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                         />
                    </div>
                    <div className="relative">
                        <div className="absolute top-3.5 left-3 text-gray-400">
                             <Lock size={20} />
                         </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-300 transform hover:scale-105">
                        <LogIn size={20} />
                        <span>Login</span>
                    </button>
                </form>
            </div>
             <p className="mt-8 text-xs text-gray-500 text-center">
                For authorized use only. © 2025 BJP Kerala. All rights reserved.
            </p>
        </div>
    );
};

export default LoginPage;