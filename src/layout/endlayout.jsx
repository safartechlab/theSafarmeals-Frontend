import {Outlet} from "react-router-dom"
import Header from "../pages/user/header/Header"
import Footer from "../pages/user/footer/Footer"
const Endlayout = () =>{

    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )

}

export default Endlayout