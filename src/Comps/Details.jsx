import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const storedLoginId = localStorage.getItem("id");
  const navigate = useNavigate();

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleEdit = (id) => {
    alert(id);
  };
  const handleDelete = (id) => {
    if (window.confirm("sure ") == true) alert(id);
  };

  return (
    <div>
      <div className="card-title">
        <h2>All Register User</h2>
      </div>
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
  );
};

export default Details;
