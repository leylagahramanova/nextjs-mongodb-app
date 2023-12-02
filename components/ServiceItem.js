// components/ServiceItem.js
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ServiceItem=({id, title, image, description})=> {
  return (
    <Card sx={{ maxWidth: 345 }}>
     <CardActionArea>
<img src={image} alt={title} />
<CardContent>
<Typography gutterBottom variant="h5" component="div">
{title}
</Typography>
<Typography variant="body2" color="text.secondary">
{description}
</Typography>
</CardContent>
</CardActionArea>
    </Card>
  );
}
export default ServiceItem;