// /pages/services/add.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
export default function Services() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const isAdmin = router.asPath.includes('/admin');
    const [services, setServices] = useState([]);
    const { id } = router.query;
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
        router.push('/www.teymur.pro/admin/services/add');
    };
    return (
        <div className="onside" >
              <section className="content-wrap">
            <div className="  w3-text-grey ">
            <h2 className="w3-text-light-grey">Services</h2>
                <div className="App">
               
                    <div className="wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="info" >
                            {services.map((service) => (
                                <div className="card" key={service._id}>
                                    <img src={service.image} alt={service.title} />
                                    <div className="overlay">
                                        <Typography gutterBottom variant="h4" component="div">
                                            {service.title}
                                        </Typography>
                                        <Typography className="description" variant="h6" color="GrayText" sx={{ maxHeight: '5rem', textOverflow: 'ellipsis', lineHeight: '1.5rem', flex: 1 }}>
                                            {service.description}
                                        </Typography>
                                        <div className="buttons">
                                        {isAdmin && (
                                            <> <IconButton color="primary" onClick={() => handleOpenEdit(service._id)}>
                                           <IoIosAddCircle />
                                        </IconButton>
                                        <IconButton  color="primary" onClick={() => deleteService(service._id)}>
                                        <TiDelete />
                                        </IconButton></>
                                           
                                        )}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            ))}
                
                        </div>
                   
                    </div>
                    {isAdmin && (
                    <Button color="primary" onClick={handleOpenAdd}>
                        Add
                    </Button>
                    )}
                </div>
            </div>
            </section>
        </div>
      

    );
}
