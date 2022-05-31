import { ThemeProvider } from '@emotion/react';
import { Paper, Grid, Container, createTheme, Button } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const BlacklistedDetails = () => {
    const navigate = useNavigate()

    const classes = {
        btnWrapper: {
            backgroundColor: "#1976d2",
            width: 'fit-content',
            minWidth: "100px",
        },
        btnBack: {
            width: "100%",
            backgroundColor: "#fff",
            '&:hover': {
                color: '#fff',
                backgroundColor: "primary.main"
            },
        },
        borderItem: {
            padding: "5px 15px",
            backgroundColor: "#fff",
        }
    }

    return (
        <Container style={{ marginTop: "40px", textAlign: "start" }}>
            <Paper
                sx={classes.btnWrapper}
            >
                <Button onClick={() => navigate('/user')} sx={classes.btnBack} startIcon={<ArrowBackIcon></ArrowBackIcon>}>Back</Button>
            </Paper>


            <Grid container spacing={5} style={{ marginTop: "50px" }}>
                <Grid item xs={12} sm={6} md={6}>
                    <img src={"https://flagcdn.com/w320/do.png"} height="100%" width="100%" alt='Flag' />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <div className="info-box">
                        <div>
                            <h3>{"Dominican Republic"}</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <ul className='info-list'>
                                        <li>
                                            <span>Native Name:</span> {"Dominican Republic"}
                                        </li>
                                        <li>
                                            <span>Population:</span> {"10847904"}
                                        </li>
                                        <li>
                                            <span>Region:</span> {"Americas"}
                                        </li>
                                        <li>
                                            <span>Sub Region:</span> {"Caribbean"}
                                        </li>
                                        <li>
                                            <span>Capital:</span> {"Santo Domingo"}
                                        </li>

                                    </ul>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <ul className='info-list'>
                                        <li>
                                            <span>Top Level Domain:</span> {".do"}
                                        </li>
                                        <li>
                                            <span>Currencies:</span> {"Dominican peso"}
                                        </li>
                                        <li>
                                            <span>Languages:</span> {"Spanish"}
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>


                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <h4>Border Countries:</h4>
                                <ul className="borderList">
                                    {["Haiti"].map((item, i) =>
                                        <li key={i}>
                                            <Paper sx={classes.borderItem}>
                                                {item}
                                            </Paper>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Container>

    )
}

export default BlacklistedDetails