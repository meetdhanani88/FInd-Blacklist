import React, { useState, useLayoutEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./index.css"

const pages = ['Users', 'Blacklisted Vendor', 'Blacklist Request'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const active = {
    my: 2, display: 'block', backgroundColor: "white", mx: 2,
    borderRadius: "20px",
    color: "#1976d2",
    '&:hover': {
        backgroundColor: "white",
        color: "#1976d2"
    }

}
const activemob = {

    color: "#1976d2",
    '&:hover': {
        backgroundColor: "white",
        color: "#1976d2"
    }

}

const AdminHomepage = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [activeclass, setactiveclass] = useState("");

    useLayoutEffect(() => {
        if (location.pathname === '/admin') {
            setactiveclass({ id: 0 })
        }
        if (location.pathname === '/admin/blacklistvendor') {
            setactiveclass({ id: 1 })
        }
        if (location.pathname === '/admin/blacklistreq') {
            setactiveclass({ id: 2 })
        }

    }, [location.pathname])


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function adminselectedoption(option) {

        handleCloseNavMenu();

        if (option === 0) {
            navigate("/admin");
        }
        if (option === 1) {
            navigate("/admin/blacklistvendor")

        }
        if (option === 2) {
            navigate("/admin/blacklistreq")
        }
    }

    return (

        <>

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
                            }}
                        >
                            Find Blacklist
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, i) => (
                                    <MenuItem key={i} onClick={() => { adminselectedoption(i); handleCloseNavMenu() }} sx={activeclass.id === i ? activemob : {}}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

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

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, i) => (
                                <Button
                                    key={i}
                                    sx={activeclass.id === i ? active : { my: 2, mx: 2, color: 'white', display: 'block', padding: "3px" }}
                                    onClick={() => adminselectedoption(i)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

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
                                    <MenuItem key={i} onClick={handleCloseUserMenu} >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet></Outlet>
        </>

    )
}

export default AdminHomepage;