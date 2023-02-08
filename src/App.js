import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Contact from './pages/contactUs/Contact'
import Home from './pages/home/Home'
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./utils/theme";
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
// react tosetify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
      <ThemeProvider theme={appTheme}>
      <ToastContainer />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App