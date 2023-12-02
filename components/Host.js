
// /components/Host.js
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { AiTwotoneEdit } from "react-icons/ai";
import { IconButton } from '@material-ui/core';

export default function Host({ description }) {
  const [hosts, setHosts] = useState([]);
  const router = useRouter();
  const circleRef = useRef([]);
  const isAdmin = router.asPath.includes('/admin');
  useEffect(() => {
    getHosts();
  }, []);
  const getHosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hosts');
      setHosts(response.data.hosts);
    } catch (error) {
      console.error('Error fetching hosts:', error);
    }
  };

  useEffect(() => {
    circleRef.current.forEach((circle) => {
      circle.classList.add('delayed-circle');
    });
  }, []);
  const handleOpenEdit = (_id) => {
    router.push(`/www.teymur.pro/admin/hosts/edit/${_id}`);
  };

  return (
    
    <>
     {hosts.map((host) => ( 
      <>    <div className="sector">
      <h1 className="w3-jumbo"><span class="w3-hide-small">I'm</span> {host.name}</h1>
      <h2>{host.profession}</h2>
   <br></br>
   <br></br>
   <br></br>
      <div className="indicator">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> </div> </>
 
      ))}<div className='w3-black'>
  <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
          <div className="container">
    
            {hosts.map((host) => (
              <div key={host._id}>
          
                <div className="onside">
                  
                  <section className="content-wrap">
               
                    <div className="text">
    
                      <div className="description-container">
                      <div className="photo">
                        <img src={host.image} alt={host.name} width="250" className="mask delayed-circle" />
                      </div>
                      <h1 className="w3"  style={{ textAlign: "center" }} >Hi!</h1>
                     
                        <h3 >
                       
                          <div dangerouslySetInnerHTML={{ __html: `&nbsp;&nbsp;${host.description}` }} />
                        </h3>
                      </div>
                  
                      <div className="buttons">
                        {isAdmin && (
                          <IconButton color="inherit" onClick={() => handleOpenEdit(host._id)}>
                            <AiTwotoneEdit />
                          </IconButton>
                        )}
                      </div>
                    </div>
    
    
    
                  </section>
                </div>
    
    
    
    
    
              </div>
            ))}
          </div>
    
        </div></>
  
  );
}

