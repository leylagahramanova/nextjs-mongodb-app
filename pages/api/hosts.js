// /pages/api/hosts.js
import connectToDatabase from "../../api-helpers/utils";
import { createHostById, getAllHosts } from "../../api-helpers/controllers/hosts-controllers";
export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === "GET") {
    return getAllHosts(req,res);
  }else if (req.method === "POST") {
    return createHostById(req, res);
  }
}

