import * as React from 'react';
import { ButtonGroup, Chip, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Products() {
  const [rows, setRows] = React.useState([
    {
      "id": 1,
      "name": "Test",
      "description": "Test test test test test test",
      "address": "http://example.com",
      "price": 100,
      "shop_name": "example.com",
      "errors": "Sample multiline\nSample multiline"
    },
    {
      "id": 2,
      "name": "Another test",
      "description": "Another another another another another",
      "address": "http://another.example.com",
      "price": 5000,
      "shop_name": "another.com",
      "errors": null
    },
    {
      "id": 3,
      "name": "Third",
      "description": "Third third third third third third",
      "address": "http://third.example.com",
      "price": 0,
      "shop_name": "third.com",
      "errors": "Sample error"
    }
  ]);

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Descrription</TableCell>
              <TableCell align="right">URL Address</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Shop name</TableCell>
              <TableCell align="right">Errors</TableCell>
              <TableCell align="right" sx={{ minWidth: 150 }}>
                <ButtonGroup>
                  <Tooltip title="Add">
                    <IconButton
                      component="span"
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete all">
                    <IconButton
                      component="span"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.shop_name}</TableCell>
                  <TableCell align="right">
                    {row.errors !== null ? "" : <Chip label="Errors" size="small" color="error" />}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup>
                      <Tooltip title="Show">
                        <IconButton
                          component="span"
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          component="span"
                          color="success"

                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          component="span"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}