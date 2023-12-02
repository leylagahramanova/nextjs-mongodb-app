// /api-helpers/controllers/services-controllers
import Service from "../model/Service";
export const getAllServices = async (req, res) => {
  let services;
  try {
    services = await Service.find();
  } catch (err) {
    throw new Error(err);
  }
  if (!services) {
  return res.status(500).json({ message: "Internal Server Error" });
  }
  if (services.length === 0) {
  return res.status(404).json({ message:"Error"})
  }
  return res.status(200).json({ services});
  };
  export async function createServiceById(req, res) {
    const { title, description, image } = req.body;if (
      !title || title.trim() === "" ||
      !description || description.trim() === "" ||
      !image || image.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
  
    let service;
    try {
      service = new Service({ title, description, image });
      service = await service.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (!service) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    return res.status(201).json({ service });
  }
export async function updateService(req, res) {
  const id=req.query.id;
  console.log(id);
  const {title, description, image}=req.body;
  if(
    !title && title.trim()=== "" &&
    !description && description.trim()=== "" &&
    !image && image.trim()=== "" 
  ){
    return res.status(422).json({message:"Invalid Inputs"})
  }
  let service;
  try{
    service = await Service.findByIdAndUpdate(id, 
      { title, description, image },
       { new: true });
  } catch (err){
    return console.log(err);
  }
  if (!service){
    return res.status(500).json({message:"Internal Server Error"})
  }
  return res.status(200).json({message:"Success"});
}
export const deleteService = async (req, res) => {
  const id = req.query.id;

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getServiceFromId = async (req,res) => {
  const id = req.query.id;
  let service;
  try {
    service = await Service.findById(id);
  } catch (err) {
  return new Error(err)
  }
  if (!service) {
  return res.status(404).json ({message: "No book found from given ID"})
  }
  return res.status(200).json({service});
};