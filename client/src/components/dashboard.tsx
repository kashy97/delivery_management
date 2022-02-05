import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import {
    Grid,
    Paper,
}   from '@mui/material';
import { Link } from '@material-ui/core';
import * as tt from '@tomtom-international/web-sdk-maps';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));


const Dashboard = () => {

    const mapElement= React.useRef()
    const [map,setMap] = React.useState({})
    React.useEffect(()=> {
         let map = tt.map({
             key: process.env.TOM_TOM_MAP_API_KEY as string,
             container : mapElement.current as any,
         })  

         setMap(map)
    }, [])
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
                <div ref={()=>(mapElement)}></div>
            </div>
        </div>
    );
}

export default Dashboard
