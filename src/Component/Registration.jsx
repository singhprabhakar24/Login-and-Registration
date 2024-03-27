import React from 'react'
import {  Grid, Paper, TextField, Button } from "@mui/material";
import { useState } from 'react';
import Login from './Login';
import {useNavigate} from 'react-router-dom'



function Registration() {

  const paperStyle = {
    padding: 10,
    height: "480px",
    width: 380,
    margin: "20px auto",
    color: "blue",
    
  };
    

    const[Fname,setFname] = useState("")
    const[Lname,setLname] = useState("")
    const[Email,setEmail] = useState("")
    const[City,setCity] = useState("")


    const navigate = useNavigate();

function handleRegister(){
  alert("Succesfully Register")
  navigate("/")
}


  return (
    <>
    <Grid>
    <Paper variant="elevation" elevation={10} style={paperStyle}>
      <Grid align="center">
        <h2>Registration </h2>
      </Grid>
      <Grid align="center">
      </Grid>
      <br />
      <Grid align="center">
        <TextField
          label="First Name"
          placeholder="First Name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <TextField
          label="Last Name"
          placeholder="Last Name"

          value={Lname}
          onChange={(e) => setLname(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
            
        <TextField
          label="Email"
          placeholder="Email"

          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <TextField
          label="City"
          placeholder="City"

          value={City}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
      </Grid>
      <Grid align="center">
        <Button  variant="contained" color="secondary" onClick={handleRegister}  >
          Register
        </Button>
      </Grid>
    </Paper>
  </Grid>
</>
  )
}

export default Registration
