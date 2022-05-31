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
import { Box, InputLabel, MenuItem, Select, FormControl, Alert } from '@mui/material';
import axiosInstance from '../../../config';
import { useMutation, useQueryClient } from 'react-query';
import Toast from '../../../Helper/Toast';
import LoadingButton from '@mui/lab/LoadingButton';


const Addblacklist = ({ openpop, handleClosepop, Listofuser }) => {

    const [plan, setplan] = React.useState(0);
    const [errmsg, seterrmsg] = React.useState(false);
    const queryClient = useQueryClient()
    const [imageFile, setImageFile] = React.useState("");
    // const [Postdata, setPostdata] = React.useState({});


    async function Addblacklist(data) {


        const res = await axiosInstance.post('/vendor/AddToBlackList', data, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })

        return res;


    }
    const addblacklist = useMutation((data) => Addblacklist(data), {
        onSuccess: data => {
            console.log(data);
            Toast({ message: data.data.message });
            // Listofuser.refetch();
            // setplan(0);
            handleReset();
            handleClosepop();


        },
        onError: (data) => {
            console.log(data);
            Toast({ message: data?.response?.data?.message || "Something Wrong", type: "error" });
            handleReset();
            handleClosepop();
            // seterrmsg(data.response.data.message);

        },
        onSettled: () => {
            queryClient.invalidateQueries('added blacklist');
        }
    })

    const handleplanChange = (event) => {
        setplan(event.target.value);
    };

    function handelAddBlacklist() {
        // console.log(values);
        // mutation.mutate();
        const finalData = {
            vendorName: values.vendorname,
            Address: values.address,
            ReasonForAdmin: values.reason,
            image: imageFile
        }
        console.log(finalData);
        addblacklist.mutate(finalData);


    }

    const validationSchema = Yup.object({

        vendorname: Yup.string().required("vendorname is required"),
        address: Yup.string().required('address is required'),
        reason: Yup.string().required("reason is required").min(10, "Minimum 10 char Require"),

    })

    const { errors, values, handleBlur, handleSubmit, handleChange, touched, isValid, handleReset } = useFormik({
        initialValues: {
            vendorname: '',
            address: '',
            reason: '',
        },
        validationSchema,
        onSubmit: handelAddBlacklist
    })

    // console.log(values.photourl);

    function handleImage(event) {
        let image = event.target.files[0];
        console.log(image);

        if (image === "" || image === undefined) {
            alert(`Not an image. This file is: ${typeof imageFile}`);
            return;
        }
        setImageFile(image);
    }

    return (
        <div>
            <Dialog open={openpop} onClose={() => handleClosepop(handleReset)} maxWidth="sm" scroll='paper'

                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{}} >
                    <DialogTitle id="scroll-dialog-title">Add New BlackList</DialogTitle>

                    <DialogContent dividers >
                        {errmsg && <Alert severity="error" variant='filled' sx={{ mt: 2, mb: 2 }}>{errmsg}</Alert>}
                        <DialogContentText  >
                            Add New Vendor to Blacklist.
                        </DialogContentText>



                        <TextField
                            error={(errors.vendorname && touched.vendorname) ? true : false}
                            required
                            margin="dense"
                            id="vendorname"
                            label="Vendor Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.vendorname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.vendorname && touched.vendorname ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.vendorname}</Alert>
                        ) : null}
                        <TextField
                            required
                            error={(errors.address && touched.address) ? true : false}
                            margin="dense"
                            id="address"
                            label="Vendor Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.address && touched.address ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.address}</Alert>
                        ) : null}
                        <TextField
                            error={(errors.reason && touched.reason) ? true : false}
                            required
                            margin="dense"
                            id="reason"
                            label="Reason For Blacklist"
                            type="text"
                            fullWidth
                            variant="standard"
                            sx={{ maxWidth: 700 }}
                            value={values.reason}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.reason && touched.reason ? (
                            <Alert variant='string' severity='error' sx={{ color: '#f44336' }}>{errors.reason}</Alert>
                        ) : null}

                        <Button
                            variant="contained"
                            component="label"
                            sx={{ my: 3 }}
                        >
                            Upload Photo Proof
                            <input
                                type="file"
                                hidden
                                accept="image/gif, image/jpeg, image/png"
                                name="image" id="imageFile"
                                onChange={handleImage}
                            />

                        </Button>
                        <div>

                            {imageFile && <img src={URL.createObjectURL(imageFile)} alt="" style={{ width: "100%" }} />}

                            {console.log(imageFile)}


                        </div>



                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => { handleClosepop(handleReset) }} >Cancel</Button>

                        <LoadingButton loading={Addblacklist.isLoading} onClick={handelAddBlacklist} disabled={!isValid || values.vendorname === ''}>Add to Blacklist</LoadingButton>
                    </DialogActions>
                </Box>


            </Dialog>
        </div>
    )
}

export default Addblacklist;