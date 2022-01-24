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
import Login from './login';
import {
    Alert,
 } from '@mui/material';

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

const Registration=() => {
    const [usernamereg, setUsernamereg] = React.useState("");
    const [passwordreg, setPasswordreg] = React.useState("");
       const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    
   const handleSubmit =(e:any) => {
    Axios.post('http://localhost:3001/register', {
      username: usernamereg,
      password:passwordreg,
    }).then((response)=> {
      if(response){
       console.log("alert",response)
      history.push('/login');
      }
    })
  }

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
            REGISTRATION
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                type="text"
                value={usernamereg}
                onChange={(e) => setUsernamereg(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="text"
                id="password"
                value={passwordreg}
                onChange={(e) => setPasswordreg(e.target.value)}
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
                // onClick={handleSubmit}
              >
           {/* <Link href="/home" >
                    {"Register"} </Link> */}
                    Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="/home" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>  
    </div>
  );
}

export default Registration;