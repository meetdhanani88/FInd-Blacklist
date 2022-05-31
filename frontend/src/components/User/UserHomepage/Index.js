import { Grid, Paper } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import { Container, createTheme } from '@mui/material'
import React from 'react'
import Blacklistedlist from './Blacklistedlist'

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
    return (

        <ThemeProvider theme={theme}>
            <Paper style={{ height: "100%", minHeight: "100vh", border: 0, boxShadow: "none" }}>
                <Container style={{ marginTop: "40px" }}>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} lg={5} style={{ marginBottom: "20px" }}>
                            <div>Search</div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2} style={{ marginBottom: "20px" }}>
                            <div>Filter </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: "20px" }}>

                        <Blacklistedlist />
                    </div>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

export default UserHomepage



