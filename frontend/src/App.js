import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import OnePage from './Components/OnePage';
import AuthAzure from './Components/AuthAzure';

 function App() {
   const [isAuthenticated, setIsAuthenticated] = React.useState(false);
   const [token, setToken] = React.useState(null);
 
    const handleLogin = (authToken) => {
      setIsAuthenticated(true);
      setToken(authToken);
      // below it allowed to store the token to keep the session open after load:
      localStorage.setItem('token', authToken);
    };
 
   return (
     <Router>
       <Routes>
         {<Route path="/login" element={<LoginPage onLogin={handleLogin} />} />}
         <Route path="/Auth" element={<AuthAzure/>} />
         <Route path="/OnePage" element={<OnePage/>} />
         {<Route path="/home" element={isAuthenticated ? <OnePage /> : <Navigate to="/login" />} />}
         <Route path="*" element={<Navigate to="/Auth" />} />
       </Routes>
     </Router>
   );
 }
 
 export default App; 