import * as React from 'react';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar 
 } from '@material-ui/core';
 import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Home = () => {
  const [task,setTask]=React.useState([]);
 
  React.useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setTask(response.data)
    })
  },[])

  console.log("t",task);
  const handleStart =(e:any) => {
    Axios.post('http://localhost:3001/api/insert', {
      // item: item,
      // amt: amt,
      // qt: qt,
    }).then(()=> {
      alert("successful insert");
    })

  };
  const handleStop=(e:any) => {
    console.log(new Date().getTime())
  }
  return (
    <div className='container'>
      <div className='menu'>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Tasks
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
      </div>
      <div className='tasks'>
        {task.map((val)=>{ 
          const{index,item,qt,amt}=val;
          return(<div key={index}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              ProductName: {item}
            </Typography>
            <Typography variant="h5" component="div">
              Amount: {amt}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Quantity: {qt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" size="small">Start</Button>
            <Button color="primary" size="small">Stop</Button>
          </CardActions>
        </Card> 
          </div>
          )
         })}
      </div>
    </div>
  );
}
 export default Home