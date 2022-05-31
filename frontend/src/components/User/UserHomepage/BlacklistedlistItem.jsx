import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Card } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const classes = {
    root: {
        maxWidth: 345,

    },
    media: {
        height: 140,
    },
    cardItemTitle: {
        fontSize: "16px",
        fontWeight: 800,
    },
    cardItemSubTitle: {
        fontSize: "14px",
        fontWeight: 600,
    },
    cardContainTitle: {
        color: "rgba(0, 0, 0, 0.87)"
    }
}

const BlacklistedlistItem = ({ country, isLoading }) => {


    const navigate = useNavigate();
    return (



        <Card sx={classes.root} style={{ height: "100%", maxWidth: "100%" }} onClick={() => navigate(`/country/${country.cca2}`)}>
            <CardActionArea>
                <CardMedia
                    style={{ height: "140px" }}
                    image={`${country.flags.png}`}
                    title="Contemplative Reptile"
                />
                <CardContent sx={{ textAlign: "start" }}>
                    <Typography gutterBottom variant="h5" component="h3" sx={classes.cardItemTitle} >
                        {country.name.common}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={classes.cardItemSubTitle} >
                        <span style={classes.cardContainTitle}>Population:</span> {country?.population}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={classes.cardItemSubTitle} >
                        <span style={classes.cardContainTitle}>Region:</span> {country?.region}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={classes.cardItemSubTitle}>
                        <span style={classes.cardContainTitle}>Capital:</span> {country?.capital || ""}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>




    )
}

export default BlacklistedlistItem;




