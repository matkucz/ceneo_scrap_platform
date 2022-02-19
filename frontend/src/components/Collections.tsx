import * as React from 'react';
import { ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Collections() {
  const [rows, setRows] = React.useState([
    {
      "id": 1,
      "title": "Test",
      "description": "Test test test test test test"
    },
    {
      "id": 2,
      "title": "Another test",
      "description": "Another another another another another"
    },
    {
      "id": 3,
      "title": "Third",
      "description": "Third third third third third third"
    }
  ]);

  return (
    <TableContainer component={Paper}>
      <Typography
        sx={{ my: 2, mx: 2 }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Collections
      </Typography>
      <Table aria-label="collection table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Descrription</TableCell>
            <TableCell align="right" sx={{ minWidth: 150 }}>
              <ButtonGroup>
                <Tooltip title="Add">
                  <IconButton
                    component={RouterLink}
                    color="primary"
                    to={`/collections/new`}
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
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Tooltip title="Show products">
                      <IconButton
                        component={RouterLink}
                        color="primary"
                        to={`/collections/${row.id}/products`}
                        >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        component={RouterLink}
                        color="success"
                        to={`/collections/${row.id}`}
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
  );
}