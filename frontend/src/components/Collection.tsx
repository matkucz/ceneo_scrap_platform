import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ToggleButton from "@mui/material/ToggleButton";
import { useParams } from 'react-router-dom';


export default function Collection() {
  const [selected, setSelected] = React.useState(false);
  const params = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      description: data.get("description")
    })
  }

  return (
    <Paper variant="outlined" component="form" onSubmit={handleSubmit} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3} sx={{ mb: 3}}>
        <Grid item xs={6}>
          <Typography component="h1" variant="h6">
            Collection ID: {params.collectionId}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: "flex-end"}}>
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
            id="title"
            name="title"
            label="Title"
            fullWidth
            InputProps={{
              readOnly: !selected
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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