
// /api-helpers/controllers/hosts-controllers
import FooterPlus from "../model/FooterPlus";
 const linkWords=["LinkedIn", "GitHub", "GitHub Gists", "Telegram channel"];
export const getAllFooterPluses = async (req, res) => {
  let footerPluses; 
  try {footerPluses = await FooterPlus.find();
  } catch (err) {
  return new Error(err);
  }
  if (!footerPluses) {
  return res.status(500).json({ message: "Internal Server Error" });
  }
  if (footerPluses.length === 0) {
  return res.status(404).json({ message:"Error"})
  }
  return res.status(200).json({ footerPluses});
  };
  export async function createFooterPlusById(req, res) {
    const { name, profession, description, image } = req.body;
    const descriptionWithLinks = linkWords.reduce((prevDescription, word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      return prevDescription.replace(
        regex,
        `<a href="/link/${word}">${word}</a>`
      );
    }, description);
    if (
      !name || name.trim() === "" ||
      !profession || profession.trim() === "" ||
      !description || description.trim() === "" ||
      !image || image.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let newFooterPlus = new FooterPlus({
      name,
      profession,
      description: descriptionWithLinks, 
      image,
    });
  
    try {
      const savedFooterPlus = await newFooterPlus.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ host:savedHost });
  }
export async function updateFooterPlus(req, res) {
  const id=req.query.id;
  console.log(id);
  const {name, profession, description, image}=req.body;
  if(
    !name && name.trim()=== "" &&
    !profession && profession.trim()=== "" &&
    !description && description.trim()=== "" &&
    !image && image.trim()=== "" 
  ){return res.status(422).json({message:"Invalid Inputs"})}
  let footerPlus;
  try{
    footerPlus=await FooterPlus.findByIdAndUpdate(id,{name, profession, description, image})
  } catch (err){ return console.log(err);}
  if (!footerPlus){
    return res.status(500).json({message:"Internal Server Error"})
  }
  return res.status(200).json({message:"Success"});
}
export const deleteHost = async (req, res) => {
  const id = req.query.id;
  try {
    const footerPlus = await FooterPlus.findByIdAndDelete(id);
    if (!footerPlus) { return res.status(404).json({ message: "FooterPlus not found" });}
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getFooterPlusFromId = async (req,res) => {
  const id = req.query.id;
  let footerPlus;
  try {footerPlus = await FooterPlus.findById(id);} catch (err) {
  return new Error(err)}
  if (!footerPlus) {
  return res.status(404).json ({message: "No book found from given ID"})
  }
  return res.status(200).json({footerPlus});
};