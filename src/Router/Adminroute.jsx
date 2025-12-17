import { Route, Routes } from "react-router-dom"
import AdminLayout from "../layout/Adminlayout"
import Dashborad from "../pages/admin/Dashborad/Dashborad"

const AdminRouter = () =>{
    return(
        <>
            <Routes>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<Dashborad/>} />
                </Route>
            </Routes>
        </>
    )
}

export default AdminRouter