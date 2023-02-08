import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook } from '@mui/icons-material';
import { Google } from '@mui/icons-material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/Loader"
// firebase auth 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config"
// react tosetify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    // loading:
    const [isLoading, setIsLoading] = useState(false)
    const Navigate= useNavigate()
    const formik = useFormik({
        initialValues: {
            email: 'demo@devias.io',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
           
        }),
        onSubmit: async (values, helpers) => {
            try {

            } catch (error) {

            }
        }
    });
    return (






        <>
{isLoading && <Loader/>}

            <Box
                component="main"
                sx={{
                    margin: "20px",
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                  

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 1 , textAlign:"center", color:"gray"}}>
                            <Typography variant="h5">Reset My Password </Typography>

                        </Box>

                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                      
                        <Box sx={{ py: 1 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Reset Password
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                py: 1
                            }}
                        >
                            <Typography
                                align="center"
                                color="textSecondary"
                                variant="body1"
                            >
                                _ OR _
                            </Typography>
                        </Box>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <Button
                                    color="info"
                                    fullWidth
                                    startIcon={<Facebook />}
                                    onClick={() => formik.handleSubmit()}
                                    size="large"
                                    variant="contained"
                                >
                                    Facebook
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <Button
                                    color="error"
                                    fullWidth
                                    onClick={() => formik.handleSubmit()}
                                    size="large"
                                    startIcon={<Google />}
                                    variant="contained"
                                >
                                    Google
                                </Button>
                            </Grid>
                        </Grid>

                        <Box sx={{ py: 2, display: 'flex', justifyContent: "space-between" }} >
                            <Typography color="textSecondary" variant="body2" >
                                Don&apos;t have an account?
                                <Link to="/register" variant="subtitle2" underline="hover"
                                    sx={{ cursor: 'pointer' }} >  Sign Up  </Link>
                            </Typography>

                            <Link to="/login" variant="subtitle2" underline="hover"
                                sx={{ cursor: 'pointer' }} >  Log In
                            </Link>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>

    )
}

export default ForgotPassword