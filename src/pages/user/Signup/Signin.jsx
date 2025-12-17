import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Row, Container, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";
import { initiallogin } from "../../../store/slice/AuthSlice";
import { showToast } from "../../../store/slice/toast_slice";

/* ================= VALIDATION ================= */
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`${Baseurl}user/login`, values);

      if (res.status === 200) {
        // save auth
        dispatch(initiallogin(res.data.data));
        localStorage.setItem("token", res.data.token);

        dispatch(
          showToast({
            message: res.data.message || "Login successful",
            type: "success",
          })
        );

        // role-based redirect
        if (res.data.role === "shop") {
          navigate("/shop/dashboard");
        } else if (res.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message || "Login failed. Try again!",
          type: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <Row xs={12} className="mx-0" style={{ backgroundColor: "#ffbe9f" }}>
        <Container className="text-center mt-5 mb-4">
          <Row>
            <Col>
              <h1 className="fw-bold fs-2 fs-md-1 font-color">
                Welcome back! Sign in
              </h1>
              <p className="fs-6 text-muted mt-2">
                Access your account to get tailored food suggestions,
                <br />
                quick checkout, and smooth order tracking
              </p>
            </Col>
          </Row>
        </Container>

        {/* LOGIN CARD */}
        <Container className="mb-5">
          <Row className="gy-4 shadow-lg border rounded-4 p-4 bg-white align-items-center">
            {/* FORM */}
            <Col xs={12} md={6} className="p-4 border-md-end">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="px-5">
                    {/* EMAIL */}
                    <div className="mb-4">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter Email Address *"
                        className="form-control p-2 rounded-3 shadow-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter Password *"
                        className="form-control p-2 rounded-3 shadow-sm"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    {/* REMEMBER / FORGOT */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <input type="checkbox" id="remember" className="me-2" />
                        <label htmlFor="remember" className="small text-muted">
                          Keep me logged in
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="small fw-semibold text-primary text-decoration-none"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn button-color w-100 py-2 fw-bold rounded-3 shadow-sm"
                    >
                      {isSubmitting ? "Logging in..." : "Log In"}
                    </button>
                  </Form>
                )}
              </Formik>
            </Col>

            {/* REGISTER */}
            <Col xs={12} md={6} className="text-center p-4">
              <div className="px-5">
                <h4 className="fw-bold mb-3">Don’t have an account?</h4>
                <p className="text-muted mb-4">
                  Don’t miss out on delicious offers! Sign up to get chef
                  specials, seasonal dishes, exclusive discounts, and more.
                  <span className="fw-bold">
                    {" "}
                    Register now and treat yourself!
                  </span>
                </p>
                <Link
                  to="/Signup"
                  className="btn w-100 py-2 button-color fw-bold rounded-3 mt-4 shadow-sm"
                >
                  Create Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </>
  );
};

export default Login;
