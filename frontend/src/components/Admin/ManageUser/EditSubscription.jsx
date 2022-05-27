import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import { Box } from '@mui/material';
import axiosInstance from '../../../config';
import { useMutation, useQueryClient } from 'react-query';
import Toast from '../../../Helper/Toast';
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const EditSubscription = ({ openEdituserpop, handleCloseEdituserpop, listofuser }) => {
    const [Edituserdata, setEdituserdata] = React.useState({});

    const queryClient = useQueryClient()
    const userlist = useSelector(state => state.Login.userlist)
    const userEditId = useSelector(state => state.Login.userEditId)
    const [plan, setplan] = React.useState(0);

    async function Inactiveplan() {
        const res = await axiosInstance.post(`/user/inActivePlan/${userEditId}`)
        console.log(res);
        return res
    }


    useLayoutEffect(() => {

        const editdata = userlist.filter(item => item._id === userEditId);

        setEdituserdata(editdata[0])
    }, [userlist, userEditId])

    const inactivesubmutation = useMutation(Inactiveplan, {

        onSuccess: async (data) => {
            listofuser.refetch();
            console.log(data);
            Toast({ message: data.data.message });
            handleReset();
            handleCloseEdituserpop();


        },
        onError: (data) => {
            console.log(data);
            Toast({ message: data?.response?.data?.message || "something Wrong", type: "error" });
            handleReset();
            handleCloseEdituserpop();


        },
        onSettled: () => {
            queryClient.invalidateQueries('userInactiveplan');
        }
    })



    const handleplanChange = (event) => {
        setplan(event.target.value);
    };

    const Addsub = async () => {
        let sp;
        if (plan === 3) {
            sp = "Silver"
        } else if (plan === 6) {
            sp = "Gold"
        } else if (plan === 12 || plan === 1) {
            sp = "Premium"
        }

        const res = await axiosInstance.post(`/user/ActivePlan/${Edituserdata._id}`, {
            Subscription_Plan: sp,
            Expire: plan
        })


        return res
    }


    const Addsubmutation = useMutation(Addsub, {
        onSuccess: data => {
            listofuser.refetch()
            console.log(data)
            Toast({ message: data.data.message });
            handleReset();
            handleCloseEdituserpop();

            // handleReset();
            // handleCloseEdituserpop();
            // Toast({ message: "User Edited" });


        },
        onError: (data) => {

            console.log(data);
            Toast({ message: data?.response?.data?.message || "Something Wrong", type: "error" });
            handleReset();
            handleCloseEdituserpop()
        },
        onSettled: () => {
            queryClient.invalidateQueries('added sub');
        }
    })


    function handelEdiuser() {

        // mutation.mutate();
        if (values.Subscription_Plan?.length > 0) {
            inactivesubmutation.mutate();

        }
        else {
            console.log("hi");
            Addsubmutation.mutate();
        }


    }



    const { errors, values, handleBlur, handleSubmit, handleChange, touched, isValid, handleReset } = useFormik({

        initialValues: {

            firstname: Edituserdata.firstName,
            lastname: Edituserdata.lastName,
            email: Edituserdata.email,
            mobileno: Edituserdata.MobileNo,
            Subscription_Plan: Edituserdata.Subscription_Plan,
            Expiry_Date: Edituserdata.Expiry_Date
        },

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
                    <DialogTitle id="scroll-dialog-title">Edit Subscription </DialogTitle>

                    <DialogContent dividers >
                        {/* {errmsg && <Alert severity="error" variant='filled' sx={{ mt: 2, mb: 2 }}>{errmsg}</Alert>} */}

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
                            disabled
                        />

                        <TextField
                            required
                            error={(errors.lastname && touched.lastname) ? true : false}
                            disabled
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

                        <TextField
                            error={(errors.email && touched.email) ? true : false}
                            required
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            disabled
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.email || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />


                        <TextField
                            error={(errors.mobileno && touched.mobileno) ? true : false}
                            required
                            disabled
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



                        {

                            values.Subscription_Plan?.length > 0 ?

                                <FormControlLabel disabled checked control={<Checkbox />} label="Inactive Subscription" /> :

                                <FormControl size='medium' sx={{ mt: 2, minWidth: 200 }} >

                                    <InputLabel id="demo-simple-select-label">Subscription Plan</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="subplan"
                                        label="Subscription Plan"
                                        value={plan}
                                        onChange={handleplanChange}
                                    >
                                        <MenuItem value={0}>None</MenuItem>
                                        <MenuItem value={12}>Premium Plan (1 Year)</MenuItem>
                                        <MenuItem value={6}>Gold Plan (6 Months)</MenuItem>
                                        <MenuItem value={3}>Silver Plan (3 Months)</MenuItem>
                                    </Select>

                                </FormControl>


                        }

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseEdituserpop} >Cancel</Button>
                        {values.Subscription_Plan?.length > 0 ?
                            <LoadingButton onClick={handelEdiuser} loading={inactivesubmutation.isLoading} disabled={!isValid || values.firstname === ''}>Inactive Plan</LoadingButton> :
                            <LoadingButton onClick={handelEdiuser} loading={Addsubmutation.isLoading} disabled={!isValid || values.firstname === ''}>Add Subscription</LoadingButton>
                        }

                    </DialogActions>
                </Box>


            </Dialog>
        </div>
    )
}

export default EditSubscription