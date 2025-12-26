import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaOpencart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setsearch } from "../../../store/slice/searchbtn";
import { clearauth } from "../../../store/slice/AuthSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.auth.username);
  const auth = useSelector((state) => state.auth.auth);
  const handlebtn = () => {
    dispatch(setsearch());
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearauth());
    navigate("/Login");
  };

  return (
    <>
      <Navbar expand="lg" className="header-bg" sticky="top" >
        <Container className="d-flex justify-content-between align-items-center">
          {/* LEFT – NAV LINKS */}
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1">
            <Nav className="me-auto d-flex align-items-center">
              <Link
                to="/"
                className="mx-3 px-2 py-2 text-decoration-none fw-bol text-white"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="mx-3 px-2 py-2 text-decoration-none fw-bol text-white"
              >
                Menu
              </Link>
              <Link
                to="/aboutus"
                className="mx-3 px-2 py-2 text-decoration-none fw-bol text-white"
              >
                About Us
              </Link>
              <Link
                to="/Contactus"
                className="mx-3 px-2 py-2 text-decoration-none fw-bol text-white"
              >
                Contact Us
              </Link>
            </Nav>
          </Navbar.Collapse>

          {/* CENTER – LOGO */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto text-white fs-2 position-absolute start-50 translate-middle-x fw-bold"
            style={{ fontFamily: " Georgia, 'Times New Roman', Times, serif" }}
          >
            SAFARMEALS
          </Navbar.Brand>

          {/* RIGHT – ICON */}
          <Row className="align-items-center ms-auto">
            <Col>
              <div onClick={handlebtn} style={{ cursor: "pointer" }}>
                <LuSearch className="fs-3 text-white" />
              </div>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle
                  className="no-caret user-toggle"
                  id="dropdown-basic"
                >
                  <AiOutlineUser className="fs-3 text-white" />
                </Dropdown.Toggle>
                {!auth ? (
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to="/SignUp"
                      className="fw-bold drop-color dropdown-item"
                    >
                      Sign Up
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/Login"
                      className="fw-bold drop-color"
                    >
                      Login
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to="/Myaccount"
                      className="fw-bold drop-color"
                    >
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={logout}
                      className="fw-bold drop-color"
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </Col>

            <Col>
              <Link to="/Cart">
                <FaOpencart className="fs-3 text-white" />
              </Link>
            </Col>

            <Col>
              <Link to="/Wishlist">
                <FaRegHeart className="fs-3 text-white" />
              </Link>
            </Col>
          </Row>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
