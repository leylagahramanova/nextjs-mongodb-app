// /api/host/[id].js
import connectToDatabase from "../../../api-helpers/utils";
import { updateHost,deleteHost, getHostFromId } from "../../../api-helpers/controllers/hosts-controllers";
export default async function handler(req,res){
await connectToDatabase();
if (req.method ==="PUT") {
    return updateHost(req, res)
} else if (req.method === "DELETE") {
    return deleteHost(req, res);
}else if (req.method === "GET") {
    return getHostFromId(req, res);
}
}

