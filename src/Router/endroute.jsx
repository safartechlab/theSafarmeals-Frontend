import { Route, Routes } from "react-router-dom"
import Endlayout from "../layout/endlayout"
import Home from "../pages/user/Home/Home"
import Menu from "../pages/user/Menu/Menu"
import Aboutus from "../pages/user/About us/Aboutus"
import Contactus from "../pages/user/Contact us/Contactus"
import Signup from "../pages/user/Signup/Signup"
import Login from "../pages/user/Signup/Signin"
import Cart from "../pages/user/Cart/Cart"
import Wishlist from "../pages/user/Wishlist/Wishlist"
import Myaccount from "../pages/user/Signup/Myaccount"
const Endrouter = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Endlayout/>}>
                <Route index element ={<Home/>} />
                <Route path="/Menu" element={<Menu/>}/>
                <Route path="/Aboutus" element={<Aboutus/>} />
                <Route path="/Contactus" element={<Contactus/>} />
                <Route path="/Myaccount" element={<Myaccount/>} />
                <Route path="/SignUp" element={<Signup/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Cart" element={<Cart/>} />
                <Route path="/Wishlist" element={<Wishlist/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default Endrouter