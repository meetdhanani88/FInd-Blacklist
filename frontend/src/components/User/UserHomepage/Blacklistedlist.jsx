import { Grid } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import BlacklistedlistItem from './BlacklistedlistItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const getAllCountriesAPI = async () => {

    const response = await axios.get('https://restcountries.com/v3.1/all');
    const data = response.data;
    return data;

}

const Blacklistedlist = () => {

    const { data, isLoading } = useQuery('getcoutry', getAllCountriesAPI);
    const countryList = data ? [...data] : [];
    // console.log(countryList);


    return (
        <div>
            {isLoading && <Box sx={{ display: 'flex', }} justifyContent="center">
                <CircularProgress />
            </Box>}

            {!isLoading && <Grid container direction='row' spacing={4}>

                {countryList?.map((country, key) =>
                    <Grid item xs={12} sm={6} md={4} lg={3} key={key} justifyContent='center'>
                        <BlacklistedlistItem country={country} />
                    </Grid>
                )}

            </Grid>}
        </div>
    )
}

export default Blacklistedlist;


