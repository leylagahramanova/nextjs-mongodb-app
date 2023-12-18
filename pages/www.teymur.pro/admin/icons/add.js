// /pages/www.teymur.pro/admin/icons/add.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
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
      const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
      const response = await axios.get(`/api/icons`);
      setIcons(response.data.icons);
    } catch (error) {
      console.error('Error fetching icons:', error);
    }
  };
  const deleteIcon = async (id) => {
    const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
    await axios.delete(`/api/icon/${id}`);
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
      await axios.post('/api/icons', { link, image, mail, phone });
    } catch (error) {
      console.error('Error adding icon:', error);
    } finally {
      handleClose();
    }
  };
  return (
    <>
       <footer className="sector" id="icons">
<div className="mid-container" id="iconSection">
       <h2 className="w3-text-white" style={{ textAlign: "center", }}>Contacts</h2>
       {icons.map((icon) => (
         <div className="" key={icon._id}>
           <div className="" style={{ alignItems: "center" }}>
             <div className="" >
               <div className="info-col"  >
                 <h4 >   {icon.phone}</h4>
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
         <IconButton color="inherit" onClick={handleOpenAdd} >
           <IoIosAddCircle />
         </IconButton>
       )}
     </div>
     <div className="footer-copyright">
       <div className="footer-copyright-wrapper">
         <p className="footer-copyright-text">
           teymur.pro © 2023
         </p>
       </div>
     </div>
     <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Add Icon</DialogTitle>
       <form onSubmit={handleSubmit}>
         <DialogContent>
         
         
           <TextField
             label="Mail"
             variant="outlined"
             fullWidth
             value={mail}
             onChange={(e) => setMail(e.target.value)}
             margin="normal"
           />

<TextField
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
   </footer>  
      </>
  );
}