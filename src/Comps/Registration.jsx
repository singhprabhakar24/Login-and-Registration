import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button, Box } from "@mui/material";
import Login from "./Login";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
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
    // updateFlag: false,
  });

  const [value, setValue] = useState([]);
  const [buttonLabel2, setButtonLabel] = useState("Register");
  const [TextLabel, setTextLabel] = useState("Registration");
  const storedLoginId = localStorage.getItem("id");
  const [empdata, empdatachange] = useState(null);

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
        empdatachange(resp);
        // setValue(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [value]);

  //////////////////////////////

  const handleDelete = (id) => {
    if (
      window.confirm("Are Your Sure You Wanted To Delete This Data?") == true
    ) {
      fetch("https://localhost:7175/api/DeleteRegistration?" + "id=" + id, {
        method: "DELETE",
      }).then((result) => {
        if (result.status === 200) {
          toast.success("User Deleted Successfully");
        }
        // setValue(resp);
      });
    }
  };
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleEdit = (id) => {
    const selectedItem = empdata.find((item) => item.id === id);
    if (selectedItem) {
      setFormData(selectedItem);
      setSelectedItemId(id);
      setButtonLabel("Update");
      setTextLabel("Update");
    }
  };
  ///////////////////////////////////////////

  c
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
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
            <h2>{TextLabel} </h2>
          </Grid>
          <Grid align="center"></Grid>
          <br />
          <Grid align="center">
            <input
              type="hidden"
              name="id"
              value={localStorage.getItem("id")}
              onChange={(e) =>
                setFormData({ ...formData, userid: e.target.value })
              }
            />
            <br />
            <br />
            <TextField
              label="First Name"
              placeholder="First Name"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              fullWidth
              required
            />
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
            <ToastContainer />
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
              {empdata &&
                empdata.map((item) => (
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
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
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
