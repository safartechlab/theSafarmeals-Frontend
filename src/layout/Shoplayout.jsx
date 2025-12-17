import { Outlet } from "react-router-dom"
import Shopheader from "../pages/ShopOwner/ShopHeader/Shopheader"
import Shopfooter from "../pages/ShopOwner/ShopFooter/Shopfooter"

const Shoplayout = () => {
    return(
        <>
            <Shopheader/>
            <Outlet/>
            <Shopfooter/>
        </>
    )
}

export default Shoplayout