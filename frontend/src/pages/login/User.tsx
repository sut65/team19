import React, { useEffect, useState } from 'react'
import SignIn from '../../components/SignIn';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

function User() {
  const [token, setToken] = useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default User