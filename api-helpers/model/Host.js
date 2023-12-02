// /api-helpers/model/Host.js
import mongoose from "mongoose";
const Host = mongoose.models.Host || mongoose.model("Host", new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}));
export default Host;

 