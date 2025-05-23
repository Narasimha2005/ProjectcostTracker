import React, { useEffect,useState } from 'react';
import { HashLoader } from 'react-spinners';
import {  Box, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, logout } from './features/authSlice';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { Provider } from "./components/ui/provider"
import ProtectedRoute from './components/ProtectedRoute';

import './App.css'

function App() {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(safeUser));
      } else {
        dispatch(logout());
      }
      setAuthLoading(false); // auth state resolved
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [dispatch]);

  if (authLoading) {
    return <div className='loading-container'><HashLoader
    height="100"
    width="100"
    color="#000000"
    /></div>; // or Chakra spinner for nicer UI
  }

  

  return (
    <Provider>
      <Box p={4} style={{backgroundColor:"#FFFFFF",color:"#000000",padding:"30px"}}>
        <BrowserRouter>
          <Heading>Project Cost Tracker</Heading>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="*" element={<Navigate to="/not-found" />}/>
          </Routes>
        </BrowserRouter>
      </Box>
    </Provider>
  );
}

export default App;
