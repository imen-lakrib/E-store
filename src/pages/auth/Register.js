import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import { Google } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/Loader"
// firebase auth 

import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config"
// react tosetify
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){
    // loading:
    const [isLoading, setIsLoading] = useState(false)
    const Navigate= useNavigate()
    const formik = useFormik({
        initialValues: {
            email: 'demo@devias.io',
            password: 'Password123',
            copassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
            copassword: Yup.string().max(255).required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                if (values.password !== values.copassword) {
                    toast.error("Passwords do not match")
                }
                setIsLoading(true)
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
                
                const newUser = userCredential.user;
                newUser.isAdmin = false;
                    setIsLoading(false)
                    toast.success("registered successfully")
                    Navigate('/login')


            } catch (error) {
                setIsLoading(false)
                toast.error(error.message)

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
                        <Box sx={{ my: 1, textAlign: "center", color: "gray" }}>
                            <Typography variant="h5">Create an account </Typography>

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
                        <TextField
                            fullWidth
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            error={Boolean(formik.touched.copassword && formik.errors.copassword)}
                            helperText={formik.touched.copassword && formik.errors.copassword}
                            label="COnfirm Password"
                            margin="normal"
                            name="copassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.copassword}
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
                                Sign In Now
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
                                <Link to="/login" variant="subtitle2" underline="hover"
                                    sx={{ cursor: 'pointer' }} >  log in  </Link>
                            </Typography>


                        </Box>
                    </form>
                </Container>
            </Box>
        </>

    )
}

export default Register