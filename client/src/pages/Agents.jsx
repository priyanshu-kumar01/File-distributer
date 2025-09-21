

import React, { useState, useEffect } from 'react';

const Agents = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [agentList, setAgentList] = useState([]);

  const token = localStorage.getItem('token'); // JWT from login

  // Fetch all agents on component mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`https://backend-dis.onrender.com/api/agent/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setAgentList(data.agents); // backend should return { success: true, agents: [...] }
        } else {
          alert(data.message || 'Error fetching agents');
        }
      } catch (err) {
        console.error(err);
        alert('Network error while fetching agents');
      }
    };

    fetchAgents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `https://backend-dis.onrender.com/api/agent/add`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await res.json();

      if (data.success) {
        setAgentList([...agentList, { name, email, mobile }]);
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        alert('Agent added successfully!');
      } else {
        alert(data.message || 'Error adding agent');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while adding agent');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-300 mb-8 tracking-wide">
        Agents Information
      </h2>

      {/* Add Agent Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />
        <input
          type="email"
          placeholder="Enter Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />
        <input
          type="number"
          placeholder="Enter Mobile No..."
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
        >
          Add Agent
        </button>
      </form>

      {/* Agents List */}
      <h3 className="text-xl text-purple-300 font-semibold mt-10 mb-4">
        Agents List:
      </h3>
      <ul className="w-full max-w-md bg-gray-800 rounded-xl p-4 space-y-2 shadow-lg">
        {agentList.map((agent, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-900 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="font-medium text-purple-200">{agent.name}</span>
            <span className="text-sm text-gray-400">{agent.email}</span>
            <span className="text-sm text-gray-400">{agent.mobile}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agents;
