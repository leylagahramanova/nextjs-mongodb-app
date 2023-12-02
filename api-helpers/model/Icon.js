// /model/Icon
import mongoose from "mongoose";
const Icon = mongoose.models.Icon || mongoose.model("Icon", new mongoose.Schema({
  link: { type: String, },
  image: { type: String,  },
  phone: { type: String,},
  mail: { type: String,},
}));
export default Icon;

 