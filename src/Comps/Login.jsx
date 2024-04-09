import React from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const paperStyle = {
    padding: 10,
    height: "340px",
    width: 280,
    margin: "100px auto",
    color: "blue",
  };

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    let iteams = { Username, Password };

    var api_url =
      "https://localhost:7175/api/UserLogin?" +
      "Username=" +
      Username +
      "&password=" +
      Password;

    fetch(api_url, {
      // mode:  'cors' ,
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {

        if (result.status === 200) {
          const id = resp.id;
          localStorage.setItem("id", id);
          // console.log("id:=>", id);
          toast.success("User Successfully Logged In");

          setTimeout(() => {
            navigate("/registration");
          }, 1000);
        } else if (result.status === 400) {
          toast.error("Login Failed")
          // console.log(resp);
        }
      });
    });
  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
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
              type="text"
              label="Email Address"
              placeholder="Email Address"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
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
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={handleLogin}
            >
              Log In
            </Button>
            <ToastContainer />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
