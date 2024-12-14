import { Routes, Route, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast';
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme, } = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
   <span className="loading loading-spinner text-secondary"></span>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?  <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"}/>} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
