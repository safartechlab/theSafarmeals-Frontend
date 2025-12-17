import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa"; // icon for orders
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { setsearch } from '../../../store/slice/searchbtn';
import { clearauth } from '../../../store/slice/AuthSlice';

const Shopheader = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth.auth);

  const handleSearch = () => {
    dispatch(setsearch());
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearauth());
    navigate('/Login');
  };

  return (
    <>
      <Navbar expand="lg" className='header-bg' sticky='top'>
        <Container className="d-flex justify-content-between align-items-center">

          {/* LEFT – NAV LINKS */}
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1">
            <Nav className="me-auto d-flex align-items-center">
              <Link to="/shop/dashboard" className='mx-3 px-2 py-2 text-decoration-none fw-bol text-white'>Home</Link>
              <Link to="/shop/shops" className='mx-3 px-2 py-2 text-decoration-none fw-bol text-white'>My Shop</Link>
              <Link to="/shop/orders" className='mx-3 px-2 py-2 text-decoration-none fw-bol text-white'>Orders</Link>
              {/* <Link to="/shop/customers" className='mx-3 px-2 py-2 text-decoration-none fw-bol text-white'>Customers</Link> */}
            </Nav>
          </Navbar.Collapse>

          {/* CENTER – LOGO */}
          <Navbar.Brand as={Link} to="/shop/dashboard" className="mx-auto text-white fs-2 position-absolute start-50 translate-middle-x fw-bold">
            SAFARMEALS ADMIN
          </Navbar.Brand>

          {/* RIGHT – ICONS */}
          <Row className="align-items-center ms-auto">
            {/* <Col>
              <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                <LuSearch className='fs-3 text-white' />
              </div>
            </Col> */}

            <Col>
              <Dropdown>
                <Dropdown.Toggle className='no-caret user-toggle' id="dropdown-basic">
                  <AiOutlineUser className='fs-3 text-white' />
                </Dropdown.Toggle>
                { !auth ? (
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/Login' className='fw-bold drop-color'>Login</Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/admin/profile' className='fw-bold drop-color'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logout} className='fw-bold drop-color'>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </Col>

            {/* <Col>
              <Link to='/admin/orders'><FaBoxOpen className='fs-3 text-white' /></Link>
            </Col> */}

          </Row>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </Container>
      </Navbar>
    </>
  );
};

export default Shopheader;
