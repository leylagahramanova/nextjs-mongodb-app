// /pages/www.teymur.pro/admin/hosts/edit/[id].js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
export default function EditHostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (id) {
      fetchHostData();
    }
  }, [id]);

  const fetchHostData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/host/${id}`);
      const { name, profession,image, description } = response.data.host; // Assuming the host object is under 'host' key
      setName(name || '');
      setProfession(profession || '');
      setImage(image || '');
      setDescription(description || '');
    } catch (error) {
      console.error('Error fetching host data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/www.teymur.pro/admin/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/host/${id}`, {name,profession, description, image });
      handleClose();
    } catch (error) {
      console.error('Error updating host:', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit host</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />  <TextField
            label="Profession"
            variant="outlined"
            fullWidth
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
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
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Update host
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
