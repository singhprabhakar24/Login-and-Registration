import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button, Box } from "@mui/material";
import Login from "./Login";
import Navbar from "./Navbar";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useCallback } from "react";
import { ReactDOM } from "react";

import toast, { Toaster } from "react-hot-toast";

function Registration() {
  const paperStyle = {
    padding: 10,
    height: "520px",
    width: 380,
    margin: "100px auto",
    color: "blue",
  };

  const [formData, setFormData] = useState({
    userid: localStorage.getItem("id"),
    fname: "",
    lname: "",
    email: "",
    city: "",
  });

  const [value, setValue] = useState(null); // this state use for only useEffect performance (Like no reload)
  const [value2, setValue2] = useState(false);
  const [buttonLabel2, setButtonLabel] = useState("Register");
  const [TextLabel, setTextLabel] = useState("Registration");
  const storedLoginId = localStorage.getItem("id");
  const [userdata, setuserdatachange] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    var api_url =
      "https://localhost:7175/api/GetRegistration?" + "userid=" + storedLoginId;

    fetch(api_url, {
      // mode:  'cors' ,
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setuserdatachange(resp);
        //setValue(resp) // without it useEffect Have some issue with toastify.
        // This is for ( you dont have to refresh the page) // so i am making changes in on state and pass that to use effect
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [value, formData]); // value passing for use effect

  //////////////////////////////

  const handleDelete = (id) => {
    if (window.confirm("Are Your Sure You Wanted To Delete This Data?")) {
      fetch("https://localhost:7175/api/DeleteRegistration?id=" + id, {
        method: "DELETE",
      }).then((result) => {
        if (result.status === 200) {
          setValue(result);
        }
      });
    }
  };

  useEffect(() => {
    if (value && value.status === 200) {
      toast.success("User Deleted Successfully");
    }
  }, [value]);

  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleEdit = (id) => {
    const selectedItem = userdata.find((item) => item.id === id);
    if (selectedItem) {
      setFormData(selectedItem);
      setSelectedItemId(id);
      // console.log("ID:=>" + selectedItemId); // checking id hear that its pasing or not
      setButtonLabel("Update");
      setTextLabel("Updation");
    }
  };
  ///////////////////////////////////////////

  const handleRegister = async (e) => {
    e.preventDefault();

    const apiUrl = selectedItemId
      ? `https://localhost:7175/api/UpdateRegistration`
      : "https://localhost:7175/api/AddRegistration";

    const method = selectedItemId ? "PUT" : "POST"; // if the selectedItemId has the value then it run put otherwise show  POST  things

    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success(
        selectedItemId
          ? "User Updated Successfully"
          : "User Registered Successfully", {
            icon: '👏',
          }
      );

      // setValue2(true)
      // changing state after Registration or Updation
      setFormData({
        userid: localStorage.getItem("id"),
        fname: "",
        lname: "",
        email: "",
        city: "",
      });
      setSelectedItemId(null);
      setButtonLabel("Register");
    } else {
      toast.error("Failed to Register/Update User");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Grid>
        <Paper variant="elevation" elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>{TextLabel} </h2>
          </Grid>
          <Grid align="center"></Grid>
          <br />
          <Grid align="center">
            {/* At First i was hiding the text that get direct value from user */}

            {/* <input
              type="hidden"
              name="id"
              value={localStorage.getItem("id")}
              onChange={(e) =>
                setFormData({ ...formData, userid: e.target.value })
              }
            /> */}
            {/* <br />
            <br /> */}
            <TextField
              label="First Name"
              placeholder="First Name"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              fullWidth
              required
              helperText={!formData.fname ? "First Name Is Required" : ""}
              error={!formData.fname}
            />
            {/* {error? <label> First Name Cant Empty </label> : ""} */}
            <br />
            <br />
            <TextField
              label="Last Name"
              placeholder="Last Name"
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              fullWidth
              required
              helperText={!formData.lname ? "Last Name Is Required" : ""}
              error={!formData.lname}
            />
            <br />
            <br />

            <TextField
              label="Email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              required
              helperText={!formData.email ? "Email Is Required" : ""}
              error={!formData.email}
            />
            <br />
            <br />
            <TextField
              label="City"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              fullWidth
              required
              helperText={!formData.city ? "City Is Required" : ""}
              error={!formData.city}
            />
            <br />
            <br />
          </Grid>
          <Grid align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRegister}
            >
              {buttonLabel2}
            </Button>
            <Toaster />
          </Grid>
        </Paper>
      </Grid>
      <div>
        <h2>All Register User</h2>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userdata &&
                userdata.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.fname}</TableCell>
                    <TableCell>{item.lname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        <ModeEditIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        variant="contained"
                        color="secondary"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Registration;
