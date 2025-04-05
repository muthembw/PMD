import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/localApi';

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post("https://pmd-backend.onrender.com", form);
      
      // Store user data in localStorage and set it in context
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      
      navigate("/");

    } catch (err) {
      // Handle different error scenarios
      console.error("Registration Error:", err);
      
      if (err.response) {
        // If backend returned an error response
        alert("Registration failed: " + (err.response.data?.message || "Unknown error"));
      } else if (err.request) {
        // If no response received from server
        alert("No response from server. Please check if the backend is running.");
      } else {
        // If an unexpected error occurred
        alert("Registration error: " + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <input
        className="border p-2 w-full"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button className="bg-blue-500 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default Register;
