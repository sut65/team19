import React, {useEffect, useState} from 'react'
import SignIn from '../../components/SignIn';
import { AdminLogin } from '../../services/HttpClientService';
import NavbarAdmin from '../../components/NavbarAdmin';

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
    <div>
      <NavbarAdmin />
    </div>
  )
}

export default Admin