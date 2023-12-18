
// /components/Host.js
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import axios from 'axios';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { AiTwotoneEdit } from "react-icons/ai";
import { IconButton } from '@material-ui/core';
import Typewriter from './Typewriter';
export default function Host({ scrollToServices }) {
  const [hosts, setHosts] = useState([]);
  const hostSectionRef = useRef(null);
  const headSectionRef = useRef(null);
  const servicesSectionRef=useRef(null);
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleServicesClick = () => {
    scrollToServices();
  };
 
  const handleHostClick = () => {
    scrollToSection(hostSectionRef);
  };
  const router = useRouter();
  const isAdmin = router.asPath.includes('/admin');
  useEffect(() => {
    getHosts();
  }, []);
  const getHosts = async () => {
    try {
      const { data } = await axios.get('/api/getHostAndPort');
          const { host, port } = data;
      const response = await axios.get('/api/hosts');
      setHosts(response.data.hosts);
    } catch (error) {
      console.error('Error fetching hosts:', error);
    }
  };
  const handleOpenEdit = (_id) => {
    router.push(`/www.teymur.pro/admin/hosts/edit/${_id}`);
  };
  
  return (
    <>
      <div className="">
      <div className="sector"> 
      {hosts.map((host) => (

<div className="sect" key={host._id} id="head" ref={headSectionRef}>
  <div className='head' >
      <h1 className="" style={{ textAlign: 'center' }}>{host.name}</h1>
  <h2 className="effect" style={{ textAlign: 'center' }}>{host.profession}</h2>
</div>
  <div className='bottom' onClick={handleHostClick}>
    <div className="indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <h2>About</h2>
  </div>
</div>
))}</div>
      </div>
   
   
      <div className="sector" id="host" ref={hostSectionRef}>
        <div className="container">
          {hosts.map((host) => (
            <div key={host._id} id={host}>
              <section className="content-wrap">
                <div className="text">
                  <div className="description-container">
                    <div className="photo">
                      <img src={host.image} alt={host.name} width="250" className="mask delayed-circle" />
                    </div>
                    <h1 className="w3" style={{ textAlign: "center" }} >Hi!</h1>
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
          ))}
        </div>
        <div className='bott' onClick={handleServicesClick}>
          <div className="indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <br></br>
          {/* <h2>Services</h2> */}
        </div>
      </div>
    </>
  );
}

