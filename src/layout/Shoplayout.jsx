import { Outlet } from "react-router-dom";
import Shopheader from "../pages/ShopOwner/ShopHeader/Shopheader";
import Shopfooter from "../pages/ShopOwner/ShopFooter/Shopfooter";

const Shoplayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Shopheader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Shopfooter />
    </div>
  );
};

export default Shoplayout;
