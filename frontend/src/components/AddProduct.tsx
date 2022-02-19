import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function AddProduct() {
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
      <Typography component="h1" variant="h6" align="center" sx={{ mb: 3 }}>
        Add new product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="URL Address"
            type="url"
            fullWidth
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="shop_name"
            name="shop_name"
            label="Shop name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="errors"
            name="errors"
            label="Errors"
            inputProps={{
                readOnly: true
            }}
            color="error"
            fullWidth
            multiline
            error
            focused
            defaultValue={"Sample multiline error\nAnother line in error"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}