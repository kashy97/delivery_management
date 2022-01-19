import * as React from 'react';
import Box from '@mui/material/Box';
import Axios from 'axios';
import {
    Alert,
 } from '@mui/material';
import { 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar 
 } from '@material-ui/core';

const Admin = () => {
  const [item, setitem] = React.useState('');
  const [amt, setAmt]= React.useState('');
  const [qt, setQt]= React.useState('');
 
  const handleItem = (e:any) => {
    setitem(e.target.value);
  };
  const handleAmount = (e:any) => {
    setAmt(e.target.value);
  };
  const handleQuantity = (e:any) => {
    setQt(e.target.value);
  };
  const handleSubmit =(e:any) => {
    Axios.post('http://localhost:3001/api/insert', {
      item: item,
      amt: amt,
      qt: qt,
    }).then(()=> {
        <Alert severity="success">Successfully Entered!</Alert>
    })

  };

  return (
    <div className='container'>
        <Box sx={{ marginTop: 8,
                display: 'flex',
                flexDirection: 'column'}}>
        <Avatar style={{ alignSelf: 'center'}} src="/broken-image.jpg" />
        <FormControl fullWidth>
            <InputLabel id="item_type">Item</InputLabel>
            <Select
            labelId="Item_type"
            id="item"
            value={item}
            label="Item"
            onChange={handleItem}
            >
            <MenuItem value="A2 Milk">A2 Milk</MenuItem>
            <MenuItem value="A2 Ghee">A2 Ghee</MenuItem>
            <MenuItem value="A2 Paneer">A2 Paneer</MenuItem>
            <MenuItem value="A2 Butter">A2 Butter</MenuItem>
            </Select>
        </FormControl>
        <br/>
        {
        item==="A2 Milk" || item=="A2 Ghee" ? 
        <FormControl fullWidth>  
            <InputLabel id="amt_type">Amount</InputLabel>
            <Select
            labelId="amt_type"
            id="amt"
            value={amt}
            label="Amount"
            onChange={handleAmount}
            >
            <MenuItem value={250}>250ml</MenuItem>
            <MenuItem value={500}>500ml</MenuItem>
            <MenuItem value={1000}>1 litre</MenuItem>
            </Select>
        </FormControl>
        : 
        <FormControl fullWidth>  
            <InputLabel id="amt_type">Amount</InputLabel>
            <Select
            labelId="amt_type"
            id="amt"
            value={amt}
            label="Amount"
            onChange={handleAmount}
            >
            <MenuItem value={250}>250gms</MenuItem>
            <MenuItem value={500}>500gms</MenuItem>
            <MenuItem value={1000}>1 kg</MenuItem>
            </Select>
        </FormControl>
        }
        <br/>
        <FormControl fullWidth>
            <InputLabel id="qt_type">Quantity</InputLabel>
            <Select
            labelId="qt_type"
            id="qt"
            value={qt}
            label="Quantity"
            onChange={handleQuantity}
            >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            </Select>
            </FormControl>
            <br/>
            <Button onClick={handleSubmit} color="primary" variant="contained">Enter</Button>
        </Box>
    </div>
  );
}
 export default Admin