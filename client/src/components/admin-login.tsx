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
import Axios from 'axios';
import history from '../history';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

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


const ALogin=() => {
    const {enqueueSnackbar} = useSnackbar();
   
    const [adusername, setAdusername] = React.useState("");
    const [adpassword, setAdpassword] = React.useState("");
    const [expanded, setExpanded] = React.useState('');
    const [adusernamereg, setAdusernamereg] = React.useState("");
    const [adpasswordreg, setAdpasswordreg] = React.useState("");

    Axios.defaults.withCredentials = true;

    const loginSubmit =(e:any) => {
      e.preventDefault();
    Axios.post('http://localhost:3001/admin-login', {
      username: adusername,
      password: adpassword,
    }).then((response)=> {
        console.log('login',response)
        
   if(response.data.message){
      enqueueSnackbar('Invalid User' , { variant:'error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
    } else{
      history.push('/admin/home');
      enqueueSnackbar('Succesful Login', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );   
    }
    })
  };
  const handleAdmin = (e:any) => {
    enqueueSnackbar('Hey,Admin Kindly Register and Login', { variant:'info', anchorOrigin:{horizontal: 'right', vertical: 'top'} } ); 
  }
  const handleUser = (e:any) => {
      history.push('/')
  }

    const handleChange = (panel:any) => (e:any, newExpanded: any) => {
        setExpanded(newExpanded ? panel : false);
    };
    
   const handleSubmit =(e:any) => {
       e.preventDefault();
    Axios.post('http://localhost:3001/admin-data', {
      username: adusernamereg,
      password: adpasswordreg,
    }).then((response)=> {
       if(response.data.message){
       console.log("alert",response)
       handleChange("")
       enqueueSnackbar('Succesful Login', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      }
      
    })
}
    

  return (
    <div className='container'>  
     <div className='title'>
        <Typography color='orange'>Poorvika Dairy Delivery Management Login</Typography>
        <div className='button'>
          <Button color='warning' variant='outlined' startIcon={ <PersonOutlineOutlinedIcon /> } size="large" onClick={handleUser}>User</Button>
          <Button color='warning' variant='outlined' endIcon={ <AdminPanelSettingsOutlinedIcon /> } size="large" onClick={handleAdmin}>Admin</Button>
        </div>
      </div>
    <Accordion expanded={expanded === 'register'} onChange={handleChange('register')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Register As Admin</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                Registration
                </Typography>
                <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    type="text"
                    value={adusernamereg}
                    onChange={(e) => setAdusernamereg(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={adpasswordreg}
                    onChange={(e) => setAdpasswordreg(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                        Register
                </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'login'} onChange={handleChange('login')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Login As Admin</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                value={adusername}
                onChange={(e) => setAdusername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={adpassword}
                onChange={(e) => setAdpassword(e.target.value)}
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
        </AccordionDetails>
      </Accordion>  
          </div>
  ); 
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <ALogin />
    </SnackbarProvider>
  );
}