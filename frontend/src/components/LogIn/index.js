import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { useQueryClient, useMutation } from 'react-query'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import axiosInstance from '../../config';
import { LoginAction } from '../../redux/reducersSlice/Loginslice';


const theme = createTheme();

function LogIn() {

    const queryClient = useQueryClient()
    const dispatch = useDispatch();
    const Loginuser = useSelector((state) => state.Login.Loginuser);
    console.log(Loginuser);

    // const [loading, setloading] = useState(false)
    const [suceessmsg, setsuceessmsg] = useState(false)
    const [errmsg, seterrmsg] = useState(false)


    //password validation
    const lowercaseRegEx = /(?=.*[a-z])/;
    const uppercaseRegEx = /(?=.*[A-Z])/;
    const numericRegEx = /(?=.*[0-9])/;
    const lengthRegEx = /(?=.{6,})/;

    const validationSchema = Yup.object({

        email: Yup.string().email('Invalid Email').required('email is required'),
        password: Yup.string()
            .matches(
                lowercaseRegEx,
                "Must contain one lowercase alphabetical character!"
            )
            .matches(
                uppercaseRegEx,
                "Must contain one uppercase alphabetical character!"
            )
            .matches(numericRegEx, "Must contain one numeric character!")
            .matches(lengthRegEx, "Must contain 6 characters!")
            .required("Required!")
    })



    const postlogin = async () => {

        let res = await axiosInstance.post("/user/SignIn", values)
        return res.data;
    }

    const { mutate, isLoading } = useMutation(postlogin, {
        onSuccess: data => {
            console.log(data);
            dispatch(LoginAction.Login(data.user));
            localStorage.setItem('token', data.token)
            setsuceessmsg(data.message)
            seterrmsg("");
        },
        onError: (data) => {
            seterrmsg(data.response.data.message);
            setsuceessmsg("");
        },
        onSettled: () => {
            queryClient.invalidateQueries('user Signup');
        }
    });


    const handelLogin = () => {
        console.log(values);

        mutate();

    }



    const { errors, values, handleBlur, handleSubmit, handleChange, touched, dirty, isValid } = useFormik({
        initialValues: {

            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handelLogin
    })





    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <AppBar position="fixed" color="primary" >
                    <Toolbar>
                        <Typography variant="h6">
                            Find Blackilist
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        marginTop: 11,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LoginRoundedIcon></LoginRoundedIcon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>

                    {errmsg && !suceessmsg && <Alert severity="error" variant='filled' sx={{ mt: 2, mb: 2 }}>{errmsg}</Alert>}
                    {suceessmsg && !errmsg && <Alert severity="success" variant='filled' sx={{ mt: 2, mb: 2 }}>{suceessmsg}</Alert>}

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    error={(errors.email && touched.email) ? true : false}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>

                            {/* {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null} */}

                            <Grid item xs={12}>
                                <TextField
                                    type='password'
                                    error={(errors.password && touched.password) ? true : false}
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>


                        </Grid>

                        <LoadingButton
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!dirty || !isValid}
                            onClick={handelLogin}
                            fullWidth
                            loading={isLoading}
                            variant="contained"
                        >
                            Log In
                        </LoadingButton>

                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Forgot password
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Reset Password
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default LogIn;