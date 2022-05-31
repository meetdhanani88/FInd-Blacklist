import { Paper } from '@mui/material'
import React from 'react'

const Applayout = ({ children }) => {
    return (
        <Paper style={{ height: "100%", minHeight: "100vh", border: 0, boxShadow: "none" }}>
            <div className='app'>
                {children}
            </div>

        </Paper>
    )
}

export default Applayout;

