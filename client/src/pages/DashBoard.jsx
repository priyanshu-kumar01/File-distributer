import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay to calm the video */}
      <div className="absolute w-full h-full bg-gray-900/60 -z-10"></div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        <Link to="/agent" className="group">
          <div className="bg-gray-800/80 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-3xl p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-teal-300">
              Manage Agents
            </h2>
            <p className="text-gray-200 text-center">
              Create new agents and view existing agents.
            </p>
          </div>
        </Link>

        <Link to="/upload" className="group">
          <div className="bg-gray-800/80 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-3xl p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-300">
              Upload CSV
            </h2>
            <p className="text-gray-200 text-center">
              Upload CSV files and distribute tasks to agents.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
