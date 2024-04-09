// Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: 1,
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(2),
    "&:hover": {
      color: "red",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  const navigate = useNavigate();

  function handleLogout() {
    var api_url =
      "https://localhost:7175/api/UserLogout?" +
      "id=" +
      localStorage.getItem("id");

    fetch(api_url, {
      // mode:  'cors' ,
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-type": "text/plain;",
      },
    }).then((result) => {
      result.json().then((resp) => {
        // console.log(resp); // hear what we write is related to api returns

        if (result.status === 200) {
          toast.success("User Successfully Logged Out");
          
          // navigate("/");
          setTimeout(() => {
            navigate("/");
          }, 500);
          localStorage.clear();
        } else {
          console.log(resp);
        }
      });
    });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppBar>
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            Gantner
          </Typography>

          <div className={classes.navlinks}>
            {localStorage.getItem("id") ? (
              <>
                <Button
                  variant="contained"
                  style={{ marginLeft: "auto" }}
                  color="primary"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
          
              </>
            ) : (
              <>
                <Link
                  component={RouterLink}
                  to="/Login"
                  className={classes.link}
                >
                  Login
                </Link>

                <Link component={RouterLink} to="/" className={classes.link}>
                  Home
                </Link>
              </>
            )}
          </div>
          <ToastContainer />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
