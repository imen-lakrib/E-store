import { Button, Container, Typography } from '@mui/material'
import React from 'react'
// redux:
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectEmail } from '../../redux/slices/authSlice'


const AdminOnlyRoute = ({children}) => {
    const userEmail= useSelector(selectEmail)
    
    if (["lak12imen@gmail.com", "imenlakrib@gmail.com"].some(item => item=== userEmail)){
        return children
    }
    return (
        <Container sx={{margin:"50px", textAlign:"center",}}>
          <div>  <Link to="/">home page</Link>
       
       
      </div>
<div><img  src="/assets/illustrations/error403.png"/></div>
        </Container>
    )
 
}

export default AdminOnlyRoute