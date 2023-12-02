//  /pages/api/services.js
import connectToDatabase from "../../api-helpers/utils";
import { createServiceById, getAllServices } from "../../api-helpers/controllers/services-controllers";
export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === "GET") {
    return getAllServices(req,res);
  }else if (req.method === "POST") {
    return createServiceById(req, res);
  }
}

