import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ToggleButton from "@mui/material/ToggleButton";
import { useParams } from 'react-router-dom';


export default function Product() {
  const [selected, setSelected] = React.useState(false);
  const params = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      description: data.get("description"),
      address: data.get("address"),
      price: data.get("price"),
      shop_name: data.get("shop_name")
    })
  }

  return (
    <Paper variant="outlined" component="form" onSubmit={handleSubmit} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography component="h1" variant="h6">
            Product ID: {params.productId}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: "flex-end" }}>
          <ToggleButton
            size="small"
            value="check"
            selected={selected}
            color="success"
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <EditIcon />
          </ToggleButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="URL Address"
            type="url"
            defaultValue={"http://example.com"}
            fullWidth
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="shop_name"
            name="shop_name"
            label="Shop name"
            fullWidth
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="errors"
            name="errors"
            label="Errors"
            color="error"
            fullWidth
            multiline
            error
            focused
            defaultValue={"Sample multiline error\nAnother line in error"}
            inputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            disabled={!selected}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}