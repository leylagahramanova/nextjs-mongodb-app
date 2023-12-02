// /pages/api/icon/[id].js
import connectToDatabase from "../../../api-helpers/utils";
import { updateIcon,deleteIcon, getIconFromId } from "../../../api-helpers/controllers/icons-controllers";
export default async function handler(req,res){
await connectToDatabase();
if (req.method ==="PUT") {
    return updateIcon(req, res)
} else if (req.method === "DELETE") {
    return deleteIcon(req, res);
}else if (req.method === "GET") {
    return getIconFromId(req, res);
}
}
