import { Col, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Sidebar from "../pages/admin/Sidebar/Sidebar"
import AdminHeader from "../pages/admin/Header/Header"
import AdminFooter from "../pages/admin/Footer/Footer"
const AdminLayout = () => {
    return(
        <>
            <div className="w-100 h-100">
                <Row className="g-0 h-100">
                    <Col xs={12} sm={3} md={2} lg={2} className="px-0 position-sticky top-0" style={{height:"100vh", overflowX:"hidden", overflowY:"hidden",zIndex:1000}}> 
                        <Sidebar/>
                    </Col>
                    <Col xs={12} sm={9} md={10} lg={10} className="px-0">
                        <AdminHeader />
                        <div className="px-2 px-md-4 py-3" style={{minHeight:'100vh', overflowY:'visible', height:'auto'}}>
                            <Outlet/>
                        </div>
                        <AdminFooter/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdminLayout