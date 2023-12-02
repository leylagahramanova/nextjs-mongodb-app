// /pages/api/service/[id].js
import connectToDatabase from "../../../api-helpers/utils";
import { updateService,deleteService, getServiceFromId } from "../../../api-helpers/controllers/services-controllers";
export default async function handler(req,res){
await connectToDatabase();
if (req.method ==="PUT") {
    return updateService(req, res)
} else if (req.method === "DELETE") {
    return deleteService(req, res);
}else if (req.method === "GET") {
    return getServiceFromId(req, res);
}
}

