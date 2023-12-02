// /pages/www.teymur.pro/admin/services/add.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import EditServicePage from './edit/[id]';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { IoIosAddCircle } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";
export default function Services() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [services, setServices] = useState([]);
    const { id } = router.query;
    const isAdmin = router.asPath.includes('/admin');
    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/services');
            setServices(response.data.services); // Adjust this line based on the actual structure of the response
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };
    const deleteService = async (id) => {
        await axios.delete(`http://localhost:3000/api/service/${id}`);
        getServices();
    };

    const handleOpenEdit = (_id) => {
        router.push(`/www.teymur.pro/admin/services/edit/${_id}`);
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
            await axios.post('/api/services', { title, description, image });
        } catch (error) {
            console.error('Error adding service:', error);
        } finally {
            handleClose();
        }
    };

    return (
        <div>
              
                <div className="onside" >
                    <section className="container">
                        <div >
                        <div >
                                  <h2 className="w3-text-light-grey" style={{textAlign:"center"}}>Services</h2>
                                  <br>
                                </br> </div>
                            <div className='App'>
                                {services.map((service) => (
                                    <div className="card" key={service._id}>
                                        <img src={service.image} alt={service.title} />
                                        <div className="overlay">
                                            <Typography gutterBottom variant="h5" component="div">
                                                {service.title}
                                            </Typography>
                                            <Typography className="description"variant="body2" color="GrayText" sx={{ maxHeight: '5rem',lineHeight: '1.5rem', flex: 1, fontSize: '1.5rem' }}>
                                                {service.description}
                                            </Typography>
                                            <div className="buttons">
                                                {isAdmin && (
                                                    <><IconButton color="inherit" onClick={() => handleOpenEdit(service._id)}>
                                                    <AiTwotoneEdit />
                                                 </IconButton>
                                                 <IconButton  color="inherit" onClick={() => deleteService(service._id)}>
                                                < AiTwotoneDelete/>
                                                 </IconButton></>

                                                )}
                                            </div>
                                        </div>

                                    </div>

                                ))}
                            
                            </div>
                            <br>
                                </br>
                                
                            {isAdmin && (
                            <IconButton color="inherit" onClick={handleOpenAdd} >
                            <IoIosAddCircle />
                            </IconButton>
                            )}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add Service</DialogTitle>
                                <form onSubmit={handleSubmit}>
                                    <DialogContent>
                                        <TextField
                                            label="Title"
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
                                            Add Service
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </div>
                    </section>
                </div>
            </div>
            );
}