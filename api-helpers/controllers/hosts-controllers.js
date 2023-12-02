
// /api-helpers/controllers/hosts-controllers
import Host from "../model/Host";
 const linkWords=["LinkedIn", "GitHub", "GitHub Gists", "Telegram channel"];
export const getAllHosts = async (req, res) => {
  let hosts;
  try {hosts = await Host.find();
  } catch (err) {
  return new Error(err);
  }
  if (!hosts) {
  return res.status(500).json({ message: "Internal Server Error" });
  }
  if (hosts.length === 0) {
  return res.status(404).json({ message:"Error"})
  }
  return res.status(200).json({ hosts});
  };
  export async function createHostById(req, res) {
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
    let newHost = new Host({
      name,
      profession,
      description: descriptionWithLinks, 
      image,
    });
  
    try {
      const savedHost = await newHost.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ host:savedHost });
  }
export async function updateHost(req, res) {
  const id=req.query.id;
  console.log(id);
  const {name, profession, description, image}=req.body;
  if(
    !name && name.trim()=== "" &&
    !profession && profession.trim()=== "" &&
    !description && description.trim()=== "" &&
    !image && image.trim()=== "" 
  ){return res.status(422).json({message:"Invalid Inputs"})}
  let host;
  try{
    host=await Host.findByIdAndUpdate(id,{name, profession, description, image})
  } catch (err){ return console.log(err);}
  if (!host){
    return res.status(500).json({message:"Internal Server Error"})
  }
  return res.status(200).json({message:"Success"});
}
export const deleteHost = async (req, res) => {
  const id = req.query.id;
  try {
    const host = await Host.findByIdAndDelete(id);
    if (!host) { return res.status(404).json({ message: "Host not found" });}
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getHostFromId = async (req,res) => {
  const id = req.query.id;
  let host;
  try {host = await Host.findById(id);} catch (err) {
  return new Error(err)}
  if (!host) {
  return res.status(404).json ({message: "No book found from given ID"})
  }
  return res.status(200).json({host});
};