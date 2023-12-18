// /pages/www.teymur.pro/admin/services/edit/[id].js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

export default function EditHostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
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
      const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
      const response = await axios.get(`/api/service/${id}`);
      const { title, image, description } = response.data.service; // Assuming the service object is under 'service' key
      setTitle(title || '');
      setImage(image || '');
      setDescription(description || '');
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/www.teymur.pro/admin/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
      await axios.put(`/api/service/${id}`, {title, description, image });
      handleClose();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className='w3-black'>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit service</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              Update service
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
