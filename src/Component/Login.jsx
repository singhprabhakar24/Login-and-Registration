import React from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
  const paperStyle = {
    padding: 10,
    height: "340px",
    width: 280,
    margin: "20px auto",
    color: "blue",
  };

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  

  const navigate = useNavigate();

  async function handleLogin() {
    let iteams = { Username, Password };
    console.log(iteams);
    fetch("https://localhost:7175/api/UserLogin", 
    {
      mode:  'cors' ,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(iteams),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      });
    });

    
  }
  return (
    <>
      <Grid>
        <Paper variant="elevation" elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Log In </h2>
          </Grid>
          <Grid align="center">
            <LoginIcon />
          </Grid>
          <br />
          <Grid align="center">
            <TextField
              label="Email Address"
              placeholder="Email Address"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
             
            />{" "}
            <br />
            <br />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              
            />
            <br />
            <br />
          </Grid>
          <Grid align="center">
            <Button variant="contained" type = "submit" color="secondary" onClick={handleLogin}  >
              Log In
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
