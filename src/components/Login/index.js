import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from 'react-router-dom';
import './index.css'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const toast = useToast();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    }
  }, [auth.currentUser, navigate]);
  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setShowErrorMsg(true)
      setErrorMsg(error.message)
      toast({ title: 'Login failed', description: error.message, status: 'error' });
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <img
          className="login-page-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <label className="login-label" htmlFor="email" value={email}>
          EMAIL
        </label>
        <input
          className="login-page-input-box"
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
        />
        <label className="login-label" htmlFor="password" value={password}>
          PASSWORD
        </label>
        <input
          className="login-page-input-box"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <button className="login-button" type="submit">
          Login
        </button>
        {showErrorMsg && <p className="login-error">*{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;
