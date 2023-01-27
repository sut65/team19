import React, {useEffect, useState} from 'react'
import SignIn from '../../components/SignIn';

function Admin() {
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
    <div>Admin</div>
  )
}

export default Admin