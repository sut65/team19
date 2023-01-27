import React, {useEffect, useState} from 'react'
import SignIn from '../../components/SignIn';
import { AdminLogin } from '../../services/HttpClientService';

function Admin() {
  const [token, setToken] = useState<String>("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn loginRole={AdminLogin} />;
  }
  
  return (
    <div>Admin</div>
  )
}

export default Admin