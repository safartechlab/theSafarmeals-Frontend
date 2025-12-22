import { Outlet } from "react-router-dom"
import Shopheader from "../pages/ShopOwner/ShopHeader/Shopheader"
import Shopfooter from "../pages/ShopOwner/ShopFooter/Shopfooter"

const Shoplayout = () => {
<<<<<<< HEAD
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
=======
    return(
        <>
            <Shopheader/>
            <Outlet/>
            <Shopfooter/>
        </>
    )
}
>>>>>>> 436f56ce657c5a46c478a2ba2ebdc09e6312ef8b

export default Shoplayout