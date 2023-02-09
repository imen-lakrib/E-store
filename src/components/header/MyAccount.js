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

export default function MyAccount() {

  
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


      <Link aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <MenuItem disableRipple>
          {isLoggedIn? (
            <>
             <Avatar alt="Remy Sharp" src="/assets/images/avatars/avatar_1.jpg" />
              <Typography >{userNameUser}</Typography>
            </>
          ):(
            <>
            <Avatar alt="Remy Sharp" src="" />
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
            <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
            <MenuItem onClick={logOutUser}>Logout</MenuItem>
            </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}><Link to="/login">Log In</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/orderHistory">My Orders</Link></MenuItem>

            </div>
        )}



      </Menu>
    </div>
  );
}