import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
// react tosetify
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
// redux:
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import AdminOnlyRoute from '../adminOnlyRoute/AdminOnlyRoute';
import { useTranslation } from 'react-i18next';

export default function MyAccount() {

  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)


  const [anchorEl, setAnchorEl] = useState(null);
  const [userNameUser, setUserNameUser] = useState("")


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName == null){
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName= u1.charAt(0).toLocaleUpperCase()+ u1.slice(1)
          setUserNameUser(uName)
        }else {setUserNameUser(user.displayName)}

        
        
        //redux:
        dispatch(SET_ACTIVE_USER({
          email:user.email,
          userName:user.displayName ? user.displayName : userNameUser ,
          userID:user.uid
        }))
        
      } else{
        setUserNameUser("")
        dispatch(REMOVE_ACTIVE_USER())
      }
      

    });
    

  }, [dispatch, userNameUser])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutUser = () => {
    try {
      signOut(auth).then(() => {
        toast.success("logout completed")
        navigate('/')
      })
      handleClose()

    } catch (error) {
      toast.error("logout failed", error)
      handleClose()
    }



  }

  return (
    <div>


      <Link p={1} aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          {/* overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto; */}
        <MenuItem  >
          {isLoggedIn? (
            <>
             <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="/assets/images/avatars/avatar_1.jpg" />
              <Typography sx={{display:{ xs: 'none', sm: 'flex' }}} flexWrap >{userNameUser}</Typography>
            </>
          ):(
            <>
            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="" />
            </>
          )}
             
           

        </MenuItem>
      </Link>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isLoggedIn ? (
          <div>
            <AdminOnlyRoute>
            <MenuItem onClick={handleClose}><Link to="/admin/dashboard">{t("dashboard")}</Link></MenuItem>
            </AdminOnlyRoute>
            <MenuItem onClick={logOutUser}>{t("logout")}</MenuItem>
            </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}><Link to="/login">{t("login")}</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/register">{t("register")}</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/orderHistory">{t("my_orders")}</Link></MenuItem>

            </div>
        )}



      </Menu>
    </div>
  );
}