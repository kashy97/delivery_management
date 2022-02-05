import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import {
    Grid,
    Paper,
}   from '@mui/material';
import { Link } from '@material-ui/core';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));


const Dashboard = () => {
    return(
        <div className="container">
            <div className="upper-section">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Link href='/home/assigned'><Item>Assigned Tasks</Item></Link>
                    <Link href='/home/progress'><Item>In Progress</Item></Link>
                    <Link href='/home/completed'><Item>Completed</Item></Link>
                </Grid>
            </div>
            <div className="map">

            </div>
        </div>
    );
}

export default Dashboard
