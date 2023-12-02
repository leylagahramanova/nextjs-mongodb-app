import mongoose from "mongoose";
const FooterPlus = mongoose.models.FooterPlus || mongoose.model("FooterPlus", new mongoose.Schema({
  phone: { type: String, required: true },
  mail: { type: String, required: true },
}));
export default FooterPlus;
