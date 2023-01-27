import React, { useEffect, useState } from 'react'
import SignIn from '../../components/SignIn';

function Trainer() {
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
    <div>Trainer</div>
  )
}

export default Trainer