import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { clearauth } from '../../../store/slice/AuthSlice';

const Shopheader = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, user } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearauth());
    navigate('/Login');
  };

  return (
    <Navbar expand="lg" className='header-bg' sticky='top'>
      <Container className="d-flex justify-content-between align-items-center">

        {/* LEFT – NAV LINKS */}
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1">
          <Nav className="me-auto d-flex align-items-center">
            <Link to="/shop/dashboard" className='mx-3 text-decoration-none fw-bold text-white'>Home</Link>
            <Link to="/shop/shops" className='mx-3 text-decoration-none fw-bold text-white'>My Shop</Link>
            <Link to="/shop/orders" className='mx-3 text-decoration-none fw-bold text-white'>Orders</Link>
          </Nav>
        </Navbar.Collapse>

        {/* CENTER – LOGO */}
        <Navbar.Brand
          as={Link}
          to="/shop/dashboard"
          className="mx-auto text-white fs-2 position-absolute start-50 translate-middle-x fw-bold"
        >
          SAFARMEALS
        </Navbar.Brand>

        {/* RIGHT – USER MENU */}
        <Row className="align-items-center ms-auto">
          <Col>
            <Dropdown align="end">
              <Dropdown.Toggle className='no-caret user-toggle'>
                <AiOutlineUser className='fs-3 text-white' />
              </Dropdown.Toggle>

              {!auth ? (
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/Login" className='fw-bold'>
                    Login
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Header className="fw-bold">
                    Hi, {user?.username || "User"}
                  </Dropdown.Header>

                  {/* <Dropdown.Item as={Link} to="/admin/profile">
                    Profile
                  </Dropdown.Item> */}

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={logout} className="text-danger fw-bold">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </Col>
        </Row>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
      </Container>
    </Navbar>
  );
};

export default Shopheader;
