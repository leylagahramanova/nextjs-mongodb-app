
// /model/Service
import mongoose from "mongoose";
const Service = mongoose.models.Service || mongoose.model("Service", new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String,  },
  description: { type: String, required: true },
}));
export default Service;

 