
//  /pages/api/icons.js
import connectToDatabase from "../../api-helpers/utils";
import { createIconById, getAllIcons } from "../../api-helpers/controllers/icons-controllers";
export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === "GET") {
    return getAllIcons(req,res);
  }else if (req.method === "POST") {
    return createIconById(req, res);
  }
}
