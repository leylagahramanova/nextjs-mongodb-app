// /pages/www.teymur.pro/admin/icons/add.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import EditIconPage from './edit/[id]';
import Grid from '@mui/material/Grid';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
export default function Icons() {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [icons, setIcons] = useState([]);
  const { id } = router.query;
  const isAdmin = router.asPath.includes('/admin');
  useEffect(() => {
    getIcons();
  }, []);

  const getIcons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/icons');
      setIcons(response.data.icons);
    } catch (error) {
      console.error('Error fetching icons:', error);
    }
  };
  const deleteIcon = async (id) => {
    await axios.delete(`http://localhost:5000/api/icon/${id}`);
    getIcons();
  };

  const handleOpenEdit = (_id) => {
    router.push(`/www.teymur.pro/admin/icons/edit/${_id}`);
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/icons', { link, image });
    } catch (error) {
      console.error('Error adding icon:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <footer className="footer">
       
           <div className="mid-container">
           <h2 className="w3-text-white" style={{ textAlign: "center", }}>Contacts</h2>
           {icons.map((icon) => (
            <div className="">
              <div className="" style={{ alignItems: "center" }}>
                <div className="" >
                  <div className="info-col"  >
                    <h4>{icon.phone}</h4>
                    <a href={`mailto:${icon.mail}`}>
  <h4>{icon.mail}</h4>
</a>
                  </div>
                </div>
              </div>

              <div className="buttons" >
                {isAdmin && (
                  <>
                    <IconButton color="black" onClick={() => handleOpenEdit(icon._id)}>
                      <AiTwotoneEdit />
                    </IconButton>
                    <IconButton color="black" onClick={() => deleteIcon(icon._id)}>
                      <AiTwotoneDelete />
                    </IconButton></>

                )}


              </div>
            </div>

          ))}
   {isAdmin && (
                            <IconButton color="black" onClick={handleOpenAdd} >
                            <IoIosAddCircle />
                            </IconButton>
                            )}
        </div>
        <div class="footer-copyright">
        <div class="footer-copyright-wrapper">
          <p class="footer-copyright-text">
             teymur.pro © 2023 
          </p>
        </div>
      </div>
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
                Add Icon
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </footer >
    </div >
  );
}