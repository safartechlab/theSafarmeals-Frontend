<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import Shophome from "../pages/ShopOwner/ShopHome/Shophome";
import Shoplayout from "../layout/Shoplayout";
import Dashboard from "../pages/ShopOwner/Shoppages/Dashboard/Dashboard";
import Orders from "../pages/ShopOwner/Shoppages/Orders/Orders";
import Shops from "../pages/ShopOwner/Shoppages/Myshop/Shops";

const Shoprouter = () => {
  return (
    <Routes>
      {/* SHOP OWNER LAYOUT */}
      <Route path="/shop" element={<Shoplayout />}>
        
        {/* DEFAULT PAGE */}
        <Route index element={<Shophome />} />

        {/* ADMIN PAGES */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="shops" element={<Shops />} />

      </Route>
    </Routes>
  );
};

export default Shoprouter;
=======
import { Route ,Routes } from "react-router-dom"
import Shophome from "../pages/ShopOwner/ShopHome/Shophome"
import Shoplayout from "../layout/Shoplayout"

const Shoprouter = () =>{
    return(
        <>
            <Routes>
                <Route path="/ShopOwner" element={<Shoplayout/>}>
                    <Route index element={<Shophome/>} />
                </Route>
            </Routes>
        </>
    )

}

export default Shoprouter
>>>>>>> 436f56ce657c5a46c478a2ba2ebdc09e6312ef8b
