import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  // track which mode we're in
  const [isLogin, setIsLogin] = useState(true);

  // form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // choose endpoint based on mode
    const endpoint = isLogin ? `${process.env.REACT_APP_API_URL}/api/admin/login`: `${process.env.REACT_APP_API_URL}/api/admin/register`;

    // build request body
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('API response:', data);

      if (data.success || data.succes) {
        // store token in localStorage
        localStorage.setItem('token', data.token);

        // redirect to dashboard
        navigate('/');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Name field only in Sign Up */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Enter Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
            className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Enter Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-400 text-sm mt-3">
          {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-300 cursor-pointer hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

