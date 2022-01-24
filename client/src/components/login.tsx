import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import history from '../history';
import {
    Alert,
 } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://poorvikadairy.in/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const Login=() => {
    const [usernamereg, setUsernamereg] = React.useState("");
    const [passwordreg, setPasswordreg] = React.useState("");
       const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const[loginstatus,setLoginstatus]=React.useState();
    //const[loginstate,setLoginstate]=React.useState(true);
    const navigate = useNavigate(); 
 
    const loginSubmit =(e:any) => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password:password,
    }).then((response)=> {
        console.log('login',response)
        
   if(response.data.message){
    // history.push('/home');
      setLoginstatus(response.data.message);
  //     setLoginstate(false);
  //  <Alert severity="error">This is an error alert — check it out!</Alert>
    } else{
      history.push('/home');
      //setLoginstate(true);
      setLoginstatus(response.data[0].username);
    
     
    }

    })
  };

  return (
    <div className='container'>  
       <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> 
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                 onClick={loginSubmit}
              >
             Sign in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>   
      {/* {loginstatus?  Popup.alert('You pressed the Save btn');: */}
     
          </div>
  );
}

export default Login;