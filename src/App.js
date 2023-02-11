import React, { useState } from 'react'
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// language:
import i18n from './utils/language/i18n';
import LocaleContext from './utils/language/LocalContext';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute'
import Admin from './pages/admin/Admin'



function App() {
  // language:
  const [locale, setLocale] = useState(i18n.language);

  return (
    <>
    <LocaleContext.Provider value={{locale, setLocale}}>
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
            <Route path='/admin/*' element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
      </LocaleContext.Provider>
    </>
  )
}

export default App