import React from "react";
import ReactDOM from "react-dom/client";  
import { BrowserRouter } from "react-router-dom";
import App from "./routes/AppRoute";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; 

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
  <BrowserRouter>
    <App />  
  </BrowserRouter>
  </AuthProvider>
);
