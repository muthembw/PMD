import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/localApi';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const { user, setUser } = useContext(AuthContext); 
  const [profile, setProfile] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await api.get("http://localhost:8000/api/user/profile");  // Assuming /user/profile endpoint
        setProfile(response.data);  
      } catch (err) {
        console.error("Error fetching user profile", err);
        alert("Error fetching profile data");
      } finally {
        setLoading(false);  
      }
    };

    if (user) {
      fetchProfile();  
    }
  }, [user]); 

  const handleLogout = () => {

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = '/login'; // Redirect to login page after logout
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading spinner or message while fetching data
  }

  if (!profile) {
    return null;  // Don't render anything if no profile data is found
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-4 z-20">
  <h3 className="font-semibold text-gray-800">{profile.name}</h3>
  <p className="text-sm text-gray-600">{profile.email}</p>
  <div className="mt-3 space-y-2">
    <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
    <Link to="/settings" className="text-blue-600 hover:underline">Settings</Link>
    <button onClick={handleLogout} className="w-full text-red-600 hover:bg-red-100 py-2 rounded-lg">
      Logout
    </button>
  </div>
</div>
  );
};

export default UserMenu;
