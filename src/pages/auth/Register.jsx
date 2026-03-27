import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-green-500 text-white p-2 rounded">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have account?
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;