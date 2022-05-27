import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Link } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ModeEdit from '@mui/icons-material/ModeEdit';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useQuery, useMutation, useQueryClient } from "react-query"
import axiosInstance from '../../../config';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../../redux/reducersSlice/Loginslice';
import { useEffect } from 'react';
import Toast from '../../../Helper/Toast';
import Addblacklist from './Addblacklist';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const userlistcss = {
    background: "#fff",
    color: "#fff",
    fontFamily: "Ubuntu,sans-serif",
    textShadow:
        "2px 2px 0 #1976d2, 2px -2px 0 #1976d2, -2px 2px 0 #1976d2, -2px -2px 0 #1976d2, 2px 0 0 #1976d2, 0 2px 0 #1976d2, -2px 0 0 #1976d2, 0 -2px 0 #1976d2",
    letterSpacing: "5px",
    ml: "35px"
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
const rows = [
    { Vendorname: "Gopal Locha", Reason: "Oily Locha", Addrress: "A.k road surat", Sentby: "ketal Patel", date: "22-10-2020", adminname: "Meet Dhanani", photourl: "http://google.com" },
    { Vendorname: "Gopal Locha", Reason: "Oily Locha", Addrress: "A.k road surat", Sentby: "ketal Patel", date: "22-10-2020", adminname: "Meet Dhanani", photourl: "http://google.com" },
    { Vendorname: "Gopal Locha", Reason: "Oily Locha", Addrress: "A.k road surat", Sentby: "ketal Patel", date: "22-10-2020", adminname: "Meet Dhanani", photourl: "http://google.com" },
    { Vendorname: "Gopal Locha", Reason: "Oily Locha", Addrress: "A.k road surat", Sentby: "ketal Patel", date: "22-10-2020", adminname: "Meet Dhanani", photourl: "http://google.com" },
]
function ManageBlacklistVendor() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openpop, setOpenpop] = React.useState(false);
    const [openEdituserpop, setopenEdituserpop] = React.useState(false);
    // const query = useQuery('getuserlist', getusertList);
    const dispatch = useDispatch();
    const queryClient = useQueryClient()

    // const deletemutation = useMutation((id) => deleteUser(id), {
    //     onSuccess: data => {
    //         console.log(data);
    //         Toast({ message: "Deleted User Successfully" })
    //         query.refetch();
    //         setAnchorEl(null);
    //     },
    //     onError: (data) => {

    //         console.log(data);
    //         Toast({ message: "Something wrong", type: "error" })

    //     },
    //     onSettled: () => {
    //         queryClient.invalidateQueries("userdeleted")

    //     }
    // }

    // )




    // const rows = query?.data?.data

    // console.log(rows);


    useEffect(() => {


        dispatch(LoginAction.userList(rows))



    }, [rows, dispatch])

    // console.log(query?.data?.data);


    const Edituserfun = (btnid) => {

        dispatch(LoginAction.GetuserEditId(btnid.id))
        handleClose();
        handleClickOpenEdituserpop()

    }
    // const Deleteuserfun = (btnid) => {
    //     deletemutation.mutate(btnid.id)

    // }

    const handleClickOpenpop = (scrollType) => {
        setOpenpop(true);
    };
    const handleClickOpenEdituserpop = () => {
        setopenEdituserpop(true)
    };

    const handleClosepop = () => {
        setOpenpop(false);

    };
    const handleCloseEdituserpop = () => {
        setopenEdituserpop(false)
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    return (
        <>
            <Addblacklist openpop={openpop} handleClosepop={handleClosepop} Listofuser={{}}></Addblacklist>
            <Grid container justifyContent={"center"} alignItems="center">

                <Grid container item xs={11} sx={{ mt: 1 }} justifyContent="space-between">

                    {/* for future like logo or anything */}
                    <Grid item>
                        <div sx={{ display: "none" }}></div>
                    </Grid>

                    <Grid item >
                        <Typography variant="h4" component="div" sx={userlistcss} >
                            List of Blacklisted Vendors
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' startIcon={<AddIcon></AddIcon>} color="primary" onClick={handleClickOpenpop}>Add New Blacklist</Button>
                    </Grid>

                </Grid>

                <Grid item xs={11} sx={{ my: 1 }}>
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 1000 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow >
                                    <StyledTableCell>Name of Vendor</StyledTableCell>
                                    <StyledTableCell>Reason for Black-list</StyledTableCell>
                                    <StyledTableCell>Vendor Address</StyledTableCell>
                                    <StyledTableCell>REQUEST SENT BY</StyledTableCell>
                                    <StyledTableCell>Blacklisted Date</StyledTableCell>
                                    <StyledTableCell>BLACKLISTED BY ADMIN</StyledTableCell>
                                    <StyledTableCell>Photo</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            {rows?.length > 0 && <TableBody>
                                {(rowsPerPage > 0
                                    ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                )?.map((row, i) => {


                                    let date = row?.Expiry_Date ? new Date(row.Expiry_Date) : null;


                                    return (

                                        <TableRow key={i}>
                                            <TableCell style={{ width: 50 }} >
                                                {row.Vendorname}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }} >
                                                {row.Reason}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }} >
                                                {row.Addrress}
                                            </TableCell>
                                            <TableCell style={{ width: 50 }} >
                                                {row.Sentby}
                                            </TableCell>
                                            <TableCell style={{ width: 70 }} >
                                                {date ? date?.toISOString().substring(0, 10) : null}
                                            </TableCell>
                                            <TableCell style={{ width: 70 }} >
                                                {row.adminname}
                                            </TableCell>
                                            <TableCell style={{ width: 70 }} >
                                                <Link href={row.photourl} underline="hover" target="_blank" rel="noreferrer" >
                                                    Photo Proof
                                                </Link>
                                            </TableCell>
                                            <TableCell style={{ width: 70 }} >

                                                <IconButton
                                                    aria-label="edit"
                                                    id={row._id}
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    style={{ boxShadow: "none" }}

                                                >
                                                    <MenuIcon color='error' />

                                                </IconButton>
                                                {/* <p style={{}} ref={rowid}>{row._id}</p> */}
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    sx={{
                                                        '& .MuiMenu-paper': {
                                                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                                        }
                                                    }}

                                                >

                                                    <MenuItem onClick={() => Edituserfun(anchorEl)}>
                                                        <ListItemIcon>
                                                            <ModeEdit fontSize="small" color="info" />
                                                        </ListItemIcon>

                                                        <ListItemText>Edit Blacklisted Vendor</ListItemText>
                                                    </MenuItem>
                                                    <MenuItem
                                                    // onClick={() => Deleteuserfun(anchorEl)}
                                                    >
                                                        <ListItemIcon>
                                                            <DeleteIcon fontSize="small" color="error" />
                                                        </ListItemIcon>
                                                        <ListItemText>Remove From BlackList</ListItemText>
                                                    </MenuItem>


                                                </Menu>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}

                            </TableBody>}

                            <TableFooter>
                                <TableRow >
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={7}
                                        count={rows ? rows?.length : 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>


        </>
    )
}

export default ManageBlacklistVendor