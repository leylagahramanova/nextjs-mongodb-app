// /api-helpers/controllers/icons-controllers
import Icon from "../model/Icon";
export const getAllIcons = async (req, res) => {
  let icons;
  try {
    icons = await Icon.find();
  } catch (err) {
    throw new Error(err);
  }
  if (!icons) {
  return res.status(500).json({ message: "Internal Server Error" });
  }
  if (icons.length === 0) {
  return res.status(404).json({ message:"Error"})
  }
  return res.status(200).json({ icons});
  };
  export async function createIconById(req, res) {
    const { link, image, mail, phone } = req.body;
  
    // Create the icon with the available data
    let icon;
    try {
      icon = new Icon({ link, image, mail, phone });
      icon = await icon.save();
      return res.status(201).json({ icon });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  export async function updateIcon(req, res) {
    const id=req.query.id;
    console.log(id);
    const {link, image, mail, phone}=req.body;
    if(
      !link && link.trim()=== "" &&
      !image && image.trim()=== ""&&
      !phone && phone.trim()=== "" &&
      !mail && mail.trim()=== ""
    ){
      return res.status(422).json({message:"Invalid Inputs"})
    }
    let icon;
    try{
      icon = await Icon.findByIdAndUpdate(id, 
        { link, image, phone, mail },
         { new: true });
    } catch (err){
      return console.log(err);
    }
    if (!icon){
      return res.status(500).json({message:"Internal Server Error"})
    }
    return res.status(200).json({message:"Success"});
  }
export const deleteIcon = async (req, res) => {
  const id = req.query.id;

  try {
    const icon = await Icon.findByIdAndDelete(id);

    if (!icon) {
      return res.status(404).json({ message: "icon not found" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getIconFromId = async (req,res) => {
  const id = req.query.id;
  let icon;
  try {
    icon = await Icon.findById(id);
  } catch (err) {
  return new Error(err)
  }
  if (!icon) {
  return res.status(404).json ({message: "No book found from given ID"})
  }
  return res.status(200).json({icon});
};