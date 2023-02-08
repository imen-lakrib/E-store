import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
// react tosetify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
// redux:
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER } from '../../redux/slices/authSlice';

export default function MyAccount() {

  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("")


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.email)
        //redux:
        dispatch(SET_ACTIVE_USER({
          email:user.email,
          userName:user.displayName,
          userID:user.uid
        }))
        
      } else {
        setUserName("")
      }
    });
    

  }, [])

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
      setIsLoggedIn(!isLoggedIn)
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
          {isLoggedIn ? (
            <>
              <Avatar alt="Remy Sharp" src="/assets/images/avatars/avatar_1.jpg" />
              <Typography >{userName}</Typography>
            </>
          ) : (
            <>
              <Avatar alt="Remy Sharp" src="" />
              <Typography >imen</Typography>

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
          <>
            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
            <MenuItem onClick={logOutUser}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}><Link to="/login">Log In</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/orderHistory">My Orders</Link></MenuItem>

          </>
        )}



      </Menu>
    </div>
  );
}