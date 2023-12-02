import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

export default function AddIconModal({ open, handleClose, handleSubmit, link, setLink, image, setImage }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Icon</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Link"
            variant="outlined"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Icon
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
