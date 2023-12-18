// /pages/www.teymur.pro/admin/services/add.js
import React, { useRef, useEffect, useState } from 'react';
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
export default function Services({ scrollToIcons }) {
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
    const servicesSectionRef = useRef(null);

    const handleIconsClick = () => {
        scrollToIcons();
    };
    const getServices = async () => {
        try {
          const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
      
          // Use relative URL instead of constructing the full URL manually
          const response = await axios.get(`/api/services`);
          setServices(response.data.services);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };
      
      const deleteService = async (id) => {
        try {
          const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
          await axios.delete(`/api/service/${id}`);
          getServices();
        } catch (error) {
          console.error('Error deleting service:', error);
        }
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
        <>
            <div className="onside" ref={servicesSectionRef} id="servicesSection"  >
                <div className="sector">
                    <section className="container" id="serverSection">
                        <div >
                            <h2 className="w3-text-light-grey" style={{ textAlign: "center" }}>Services</h2>
                            <br></br>
                            <div className='App scrollbar force-overflow' id='style-13'>
                                {services.map((service) => (
                                    <div className="card" key={service._id}>
                                        <img src={service.image} alt={service.title} />
                                        <div className="overlay">
                                            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                                                {service.title}
                                            </Typography>
                                            <Typography className="description" variant="p" component="div" color="WhiteText" sx={{ maxHeight: '5rem', lineHeight: '1.5rem', flex: 1, fontSize: '1.5rem' }}>
                                                &nbsp;{service.description}
                                            </Typography>
                                            <div className="buttons">
                                                {isAdmin && (
                                                    <><IconButton color="inherit" onClick={() => handleOpenEdit(service._id)}>
                                                        <AiTwotoneEdit />
                                                    </IconButton>
                                                        <IconButton color="inherit" onClick={() => deleteService(service._id)}>
                                                            < AiTwotoneDelete />
                                                        </IconButton></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

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

                    <div className='bott2' onClick={handleIconsClick}>
                        <div className="indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <br></br>
                        {/* <h2>Contacts</h2> */}
                    </div>
                </div>
            </div>
        </>

    );
}