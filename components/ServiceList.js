// // components/ServiceList.js
// import React from "react";
// import { Grid } from "@mui/material";
// import ServiceItem from "./ServiceItem";
// const ServiceList = ({ data }) => {
//     return (
//         <div>
//             <Grid container>
//                 {data.map((service) => (
//                     <Grid item key={service._id}>
//                         <ServiceItem title={service.title}
//                             image={service.image}
//                             description={service.author}
//                             id={service._id} />
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };
// export default ServiceList;