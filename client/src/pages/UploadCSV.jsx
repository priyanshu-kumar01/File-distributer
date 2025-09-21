import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const UploadCSV = () => {
  const [csvData, setCsvData] = useState([]);
  const [distributed, setDistributed] = useState([]);
  const [agents, setAgents] = useState([]);

  // Fetch agents from backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token'); // get JWT from login
        if (!token) return alert('Please login first to fetch agents');

        const res = await fetch('http://localhost:5000/api/agent/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setAgents(data.agents); // set agents from DB
        } else {
          alert(data.message || 'No agents found');
        }
      } catch (err) {
        console.error(err);
        alert('Network error fetching agents');
      }
    };

    fetchAgents();
  }, []);

  // Handle CSV file upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setCsvData(res.data);
        setDistributed([]);
      },
    });
  };

  // Distribute tasks to real agents
  const handleDistribute = () => {
    if (agents.length === 0) {
      alert('No agents available for distribution');
      return;
    }

    const temp = agents.map((a) => ({ agent: a.name, tasks: [] }));

    csvData.forEach((row, index) => {
      const agentIndex = index % agents.length;
      temp[agentIndex].tasks.push(row);
    });

    setDistributed(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-300 mb-8 tracking-wide">
        Upload CSV
      </h2>

      {/* File Upload */}
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="w-full text-gray-200 bg-gray-900 rounded-xl p-3 cursor-pointer 
                     file:mr-4 file:rounded-lg file:border-0 file:bg-purple-500 
                     file:text-white file:px-4 file:py-2 hover:file:bg-purple-600"
        />
      </div>

      {/* CSV Data Preview */}
      {csvData.length > 0 && (
        <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-3xl mt-8 space-y-4">
          <h3 className="text-xl text-purple-300 font-semibold">CSV Data (Preview):</h3>
          <div className="overflow-auto max-h-60 bg-gray-900 rounded-lg p-4 text-gray-300 text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((key, i) => (
                    <th key={i} className="px-3 py-2 border-b border-gray-700 text-purple-200 font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-800/50">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-3 py-2 border-b border-gray-700 text-gray-300">
                        {val || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">Showing first 5 rows...</p>
          </div>

          <button
            onClick={handleDistribute}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
          >
            Distribute to Agents
          </button>
        </div>
      )}

      {/* Distributed Data */}
      {distributed.length > 0 && (
        <div className="w-full max-w-6xl mt-10">
          <h3 className="text-2xl text-purple-300 font-semibold mb-6 text-center">
            Distributed Tasks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distributed.map((item, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-purple-500/30 rounded-2xl p-6 shadow-lg hover:border-purple-400 transition"
              >
                <h4 className="text-lg font-bold text-purple-200 mb-4">{item.agent}</h4>
                {item.tasks.length === 0 ? (
                  <p className="text-gray-400 text-sm">No tasks assigned</p>
                ) : (
                  <div className="overflow-auto max-h-60 space-y-2">
                    {item.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-900 rounded-lg p-3 text-gray-200 text-sm hover:bg-gray-700 transition"
                      >
                        {Object.entries(task).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center border-b border-gray-700/40 py-1 text-xs"
                          >
                            <span className="text-gray-400">{key}:</span>
                            <span className="text-gray-200 font-medium break-words">{value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;
