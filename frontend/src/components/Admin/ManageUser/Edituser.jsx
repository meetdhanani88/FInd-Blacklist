import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Alert } from '@mui/material';
import axiosInstance from '../../../config';
import { useMutation, useQueryClient } from 'react-query';
import Toast from '../../../Helper/Toast';
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';

const Edituser = ({ openEdituserpop, handleCloseEdituserpop }) => {

    const [Edituserdata, setEdituserdata] = React.useState({});

    const [errmsg, seterrmsg] = React.useState(false);
    const queryClient = useQueryClient()
    const userlist = useSelector(state => state.Login.userlist)
    const userEditId = useSelector(state => state.Login.userEditId)

    useLayoutEffect(() => {
        
        const editdata = userlist.filter(item => item._id === userEditId);

        setEdituserdata(editdata[0])
    }, [userlist, userEditId])

    async function EditCreateduser() {

        const res = await axiosInstance.post(`/user/updateUser/${Edituserdata._id}`, {
            firstName: values.firstname,
            lastName: values.lastname,
            email: values.email,
            MobileNo: values.mobileno,

        })

        return res;

    }
    const mutation = useMutation(EditCreateduser, {
        onSuccess: data => {
            console.log(data)
            handleReset();
            handleCloseEdituserpop();
            Toast({ message: "User Edited" });


        },
        onError: (data) => {

            seterrmsg(data.response.data.message);

        },
        onSettled: () => {
            queryClient.invalidateQueries('userEdited');
        }
    })


    function handelEdiuser() {


        // const finaldata = {
        //     ...values,

        // }
        // console.log("finaldata", finaldata);

        mutation.mutate();


    }

    const validationSchema = Yup.object({

        firstname: Yup.string().required("firstname is required"),
        lastname: Yup.string().required("lastname is required"),
        email: Yup.string().email('Invalid Email').required('email is required'),
        mobileno: Yup.string().min(10, "Minimum Length 10").required("mobile no is require"),
    })

    const { errors, values, handleBlur, handleSubmit, handleChange, touched, isValid, handleReset } = useFormik({
        initialValues: {

            firstname: Edituserdata.firstName,
            lastname: Edituserdata.lastName,
            email: Edituserdata.email,
            mobileno: Edituserdata.MobileNo,
        },
        validationSchema,
        onSubmit: handelEdiuser,
        enableReinitialize: true
    })

    return (
        <div>
            <Dialog open={openEdituserpop} onClose={handleCloseEdituserpop} maxWidth="sm" scroll='paper'

                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <DialogTitle id="scroll-dialog-title">Edit Existing UserData </DialogTitle>

                    <DialogContent dividers >
                        {errmsg && <Alert severity="error" variant='filled' sx={{ mt: 2, mb: 2 }}>{errmsg}</Alert>}
                        <DialogContentText  >
                            Edit User
                        </DialogContentText>



                        <TextField
                            error={(errors.firstname && touched.firstname) ? true : false}
                            required

                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.firstname || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.firstname && touched.firstname ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.firstname}</Alert>
                        ) : null}
                        <TextField
                            required
                            error={(errors.lastname && touched.lastname) ? true : false}
                            margin="dense"
                            id="lastname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.lastname || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lastname && touched.lastname ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.lastname}</Alert>
                        ) : null}
                        <TextField
                            error={(errors.email && touched.email) ? true : false}
                            required
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.email || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.email}</Alert>
                        ) : null}

                        <TextField
                            error={(errors.mobileno && touched.mobileno) ? true : false}
                            required
                            margin="dense"
                            id="mobileno"
                            label="Mobile No"
                            type="number"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.mobileno || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.mobileno && touched.mobileno ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.mobileno}</Alert>
                        ) : null}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseEdituserpop} >Cancel</Button>
                        <Button onClick={handelEdiuser} disabled={!isValid || values.firstname === ''}>Edit User</Button>
                    </DialogActions>
                </Box>


            </Dialog>
        </div>
    )
}


export default Edituser; 