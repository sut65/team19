import React, { useEffect, useState } from 'react'
import SignIn from '../../components/SignIn';

 import { TrainerLogin } from '../../services/HttpClientService';
import ProfileTrainer from "../../components/Trainer/ProfileTrainer";



function Trainer() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn loginRole={TrainerLogin} />;
  }
  
  return (
    <ProfileTrainer/>
  )
}

export default Trainer