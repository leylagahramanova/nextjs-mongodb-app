
// pages/www.teymur.pro/admin/index.js
import Host from "../../../components/Host";
import Services from "../admin/services/add";
import Icons from "../admin/icons/add"
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
