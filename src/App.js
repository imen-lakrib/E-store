import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Contact from './pages/contactUs/Contact'
import Home from './pages/home/Home'
import { CssBaseline, ThemeProvider } from "@mui/material";
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
import ProductDetails from './components/products/ProductDetails'
import Checkout from './pages/checkout/Checkout'



function App() {
  // language:
  const [locale, setLocale] = useState(i18n.language);
  const [direction, setDirection] = useState( localStorage.getItem("direction") || "ltr");

  useEffect(() => {
    localStorage.setItem("direction", direction);
  }, [direction]);

  return (
    <div style={{direction: direction === "rtl" ? "rtl" : "ltr"}}>
    <LocaleContext.Provider value={{locale, setLocale}}>
      <BrowserRouter>
      <ThemeProvider theme={appTheme}>
      <ToastContainer />
      <CssBaseline />
          <Header   setDirection={setDirection}/>
          
          <Routes>
            <Route path='/' element={<Home direction={direction} />} />
            <Route path='/product-details/:id' element={<ProductDetails/>}/>
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/checkout' element={<Checkout />} />
            
            <Route path='/admin/*' element={<AdminOnlyRoute><Admin direction={direction} /></AdminOnlyRoute>} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
      </LocaleContext.Provider>
    </div>
  )
}

export default App