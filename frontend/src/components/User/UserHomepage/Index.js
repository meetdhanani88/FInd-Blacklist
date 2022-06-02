import { Paper } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import { Container, createTheme } from '@mui/material'
import React, { useState } from 'react'
import Blacklistedlist from './Blacklistedlist'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
//import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
//import LogoutIcon from '@mui/icons-material/Logout';
import "./index.css"

// const pages = ['Users', 'Blacklisted Vendor', 'Blacklist Request'];
const settings = ['Profile', 'Logout'];

const theme = createTheme({
    typography: {
        fontFamily: "Nunito Sans",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 800,
        fontSize: 14,

    },
    palette: {
        mode: 'light',
    },

});

const UserHomepage = () => {


    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = (setting) => {
        if (setting === "Logout") {
            localStorage.removeItem("token");
            navigate("/login");
        }
        setAnchorElUser(null);
    };

    return (

        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"

                            sx={{
                                mr: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.03rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >
                            Find Blacklist
                        </Typography>



                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

                        <Typography
                            variant="h5"
                            noWrap
                            component="div"

                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.03rem',
                                color: 'inherit',
                                textDecoration: 'none'

                            }}
                        >
                            Find Blacklist
                        </Typography>



                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                {settings.map((setting, i) => (
                                    <MenuItem key={i} onClick={() => handleCloseUserMenu(setting)} >

                                        <Button disableElevation={true} disableFocusRipple={true} variant="text" fullWidth
                                            sx={{ '&:hover': { backgroundColor: "#fff", } }}
                                        >
                                            {setting}
                                        </Button>

                                    </MenuItem>
                                ))}

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Paper style={{ height: "100%", minHeight: "100vh", border: 0, boxShadow: "none" }}>
                <Container style={{ marginTop: "40px" }}>


                    <div style={{ marginTop: "20px" }}>

                        <Blacklistedlist />

                    </div>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

export default UserHomepage



