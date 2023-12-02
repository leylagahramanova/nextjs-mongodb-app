// /api-helpers/controllers/icons-controllers
import Icon from "../model/Icon";
const linkWords=["teymur_gahramanov@outlook.com"];
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
    const mailWithLinks = linkWords.reduce((prevMail, word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      return prevMail.replace(
        regex,
        `<a href="/link/${word}">${word}</a>`
      );
    }, mail);if (
      !link || link.trim() === "" ||
      !image || image.trim() === ""||
      !mail|| mail.trim() === ""||
      !phone|| phone.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let newIcon=new Icon({
link, image, mail, phone
    })
    try {
   const savedIcon=await newIcon.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ icon:savedIcon });
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