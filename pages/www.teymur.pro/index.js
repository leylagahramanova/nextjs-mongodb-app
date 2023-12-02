// pages/www.teymur.pro/index.js
import Host from "../../components/Host";
import Services from "../www.teymur.pro/admin/services/add";
import Icons from "../www.teymur.pro/admin/icons/add"

function Site() {
  return (
    <div>
    <div className="w3-black">
        <Host />
        <Services />
        <Icons />
      </div>
    </div>
  );
}
export default Site;

