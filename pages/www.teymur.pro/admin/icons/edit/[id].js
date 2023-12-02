import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

export default function EditIconPage() {
  const router = useRouter();
  const { id } = router.query;
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(true);
  const [mail, setMail]=useState('');
  const [phone, setPhone]=useState('');
  useEffect(() => {
    if (id) {
      fetchIconData();
    }
  }, [id]);

  const fetchIconData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/icon/${id}`);
      const { link, image, phone, mail } = response.data.icon; // Assuming the icon object is under 'icon' key
      setLink(link || '');
      setImage(image || '');
      setMail(mail|| '');
      setPhone(phone ||'');
    } catch (error) {
      console.error('Error fetching icon data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/www.teymur.pro/admin/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/icon/${id}`, { link, image });
      handleClose();
    } catch (error) {
      console.error('Error updating icon:', error);
    }
  };

  return (
    <div className='w3-black'>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Icon</DialogTitle>
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
                   <TextField
                label="Mail"
                variant="outlined"
                fullWidth
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                margin="normal"
              />
                     <input
                     type="tel"
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Update Icon
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
