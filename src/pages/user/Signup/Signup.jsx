import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as yup from 'yup'
import axios from "axios"
import { Row ,Container,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Baseurl } from '../../../Baseurl';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../store/slice/toast_slice';
// import { showToast } from '../../../store/slice/toast_slice';
    const validationSchema = yup.object().shape({
        username:yup.string().required('Username is required.'),
        email:yup.string().email('Invalid Email').required('Email is required.'),
        password:yup.string().min(6,"Password must be at least 6 characters.").required('Password is required.'),
        confirmpassword: yup.string().oneOf([yup.ref("password"),null],"Password must match").required("Confirm Password is required"),
        phone: yup.number().required('Mobile No is required'),
        role: yup.string().required()
    });

    const initialvalue = {
        username:"",
        email:"",
        password:"",
        confirmpassword:'',
        phone:'',
        role:'',
    }

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async(values,{setsubmitting,resetForm}) =>{
    try{
        const {confirmpassword ,...payload} = values

        const res = await axios.post(`${Baseurl}user/signup`,payload)
        console.log(res.status);
        if(res.status){
          dispatch(showToast({message:res.data.message,type:'success'}))
          resetForm()
          navigate("/Login")
        }
        else{
          dispatch(showToast({message:res.data.message,type:'error'}))
        }
        
    }
    catch(error){
      dispatch(showToast({message:error.response?.data?.message,type:'error'}))
    }
  } 
 
    return (
        <>
           <Row xs={12} className="mx-0" style={{ backgroundColor: "#ffbe9f" }}>
        <Container className="text-center mt-5 mb-4">
          <Row>
            <Col>
              <h1 className="fw-bold fs-2 font-color">Create Your Account</h1>
              <p className="fs-6 text-muted mt-2">
                Join us today! Enjoy chef-special deals, tailored food suggestions, <br/>
                and a lightning-fast checkout experience
              </p>
            </Col>
          </Row>
        </Container>
        {/* Signup Card */}
        <Container className="mb-5">
          <Row className="gy-4 shadow-lg border rounded-4 p-4 bg-white align-items-center">
            {/* Left Column - Form */}
            <Col xs={12} md={6} className="p-4 border-md-end border-end">
              <Formik initialValues={initialvalue}validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="px-5">
                  {/* Username */}
                  <div className="mb-3">
                    <Field name="username"type="text"placeholder="Full Name *"className="form-control p-3 rounded-3 shadow-sm"/>
                    <ErrorMessage name="username" component="div" className="text-danger mt-1 small"/>
                  </div>
                  {/* Email */}
                  <div className="mb-3">
                    <Field name="email"type="email"placeholder="Email Address *"className="form-control p-3 rounded-3 shadow-sm"/>
                    <ErrorMessage name="email"component="div"className="text-danger mt-1 small"/>
                  </div>
                  {/* phone */}
                  <div className="mb-3">
                    <Field name="phone"type="phone"placeholder="Mobile No *"className="form-control p-3 rounded-3 shadow-sm"/>
                    <ErrorMessage name="email"component="div"className="text-danger mt-1 small"/>
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <Field name="password"type="password"placeholder="Password *"className="form-control p-3 rounded-3 shadow-sm"/>
                    <ErrorMessage name="password"component="div"className="text-danger mt-1 small"/>
                  </div>
                  {/* Confirm Password */}
                  <div className="mb-3">
                    <Field name="confirmpassword" type="password" placeholder="Confirm Password *"className="form-control p-3 rounded-3 shadow-sm"/>
                    <ErrorMessage name="confirmpassword" component="div" className="text-danger mt-1 small"/>
                  </div>
                  {/* role (hidden, default = user) */}
                  <div className="mb-3">
                    <label className="fw-semibold mb-2">Role:</label>
                    <div className="d-flex gap-3">
                      <label><Field type="radio" name="role" value="user" /> User</label>
                      <label><Field type="radio" name="role" value="shop" /> Shop Owner</label>
                    </div>
                    <ErrorMessage name="role" component="div" className="text-danger mt-1 small"/>
                  </div>
                  {/* Submit */}
                  <button type="submit" className="btn button-color w-100 py-2 fw-bold rounded-3 shadow-sm">Sign Up</button>
                </Form>
              </Formik>
            </Col>
            {/* Right Column - Sign In */}
            <Col xs={12} md={6} className="text-center p-4">
              <div className="px-5">
                <h4 className="fw-bold mb-3">Already have an account?</h4>
                <p className="text-muted mb-4">
                  Log in to explore your order history, save your signature dishes,<br/> and enjoy a premium, hassle-free dining experience.
                </p>
                <Link to="/Login" className="btn w-100 py-2 button-color fw-bold rounded-3 mt-4 shadow-sm">Log In</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
        </>
    )
}
export default Signup