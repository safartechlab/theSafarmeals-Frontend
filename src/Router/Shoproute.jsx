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