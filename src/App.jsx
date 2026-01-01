
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPasswordPage';

//309651160594-59496ucjsk3kehjlb3ti11v9olgqt3vu.apps.googleusercontent.com

import { Analytics } from '@vercel/analytics/react';

function App() {
 
  return (
    <GoogleOAuthProvider clientId="309651160594-59496ucjsk3kehjlb3ti11v9olgqt3vu.apps.googleusercontent.com">
    <BrowserRouter>
        <Toaster position="top-right"/>
          <div className="w-full h-screen bg-primary text-secondary ">            

            <Routes>
                <Route path="/*" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/admin/*" element={<AdminPage/>}/>                
                <Route path="/forgot-password" element= {<ForgetPasswordPage/>}/>
            </Routes>
            <Analytics />

          </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
