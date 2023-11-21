import React ,{useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {toast,ToastContainer} from "react-toastify"
import logo from "../../Navbar/logo.png"
import "../auth.css"
import { useNavigate } from 'react-router-dom';
const FormData = {
    email: String,
    password: String
  };


  const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const validationErrors = {};
      if (!formData.email.trim()) {
        validationErrors.email = 'Email is required';
      }
      if (!formData.password.trim()) {
        validationErrors.password = 'Password is required';
      }
  
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
  
      // Additional logic for form submission...console.log(process.env.REACT_APP_BACKEND_API)
        fetch(`${process.env.REACT_APP_BACKEND_API}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
      })
          .then((res) => {
              return res.json();
          })
          .then(async (response) => {
              console.log('login res ', response)
              console.log(response.ok)
              if (response.ok) {
                  toast(response.message, {
                      type: 'success',
                      position: 'top-right',
                      autoClose: 2000
                  })
                  // await setCookie('authToken', response.data.authToken)
                  // await setCookie('refreshToken', response.data.refreshToken)
                  // const authToken = await getCookie('authToken');
                  // console.log('My Cookie Value:', authToken);
                  checkLogin()
              } else {
                  toast(response.message, {
                      type: 'error',
                      position: 'top-right',
                      autoClose: 2000
                  });
              }
          })
          .catch((error) => {
              toast(error.message, {
                  type: 'error',
                  position: 'top-right',
                  autoClose: 2000
              });
          })
        };
        const checkLogin = async () => {
          // let authToken = await getCookie('authToken')
          // let refreshToken = await getCookie('refreshToken')
  
          // console.log(authToken, refreshToken)
          await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/checklogin`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
  
          })
              .then((res) => {
                  return res.json();
              })
              .then((response) => {
                  console.log('check login res ', response)
  
  
  
                  if (response.ok) {
                      // toast(response.message, {
                      //     type: 'success',
                      //     position: 'top-right',
                      //     autoClose: 2000
                      // })
  
                      // navigate('/');
                      window.location.href("/")
  
                  } else {
                      // toast(response.message, {
                      //     type: 'error',
                      //     position: 'top-right',
                      //     autoClose: 2000
                      // });
                  }
              })
              .catch((error) => {
                navigate('/');
              })
      };
  
    return (
      <div className='authout'>
        <div className='authin'>
          <div className="left">
            <img src={logo} alt="Logo" className='img' />
          </div>
          <div className='right'>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              onSubmit={handleSubmit}
            >
              <div className="forminput_cont">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="formerror">{errors.email}</span>}
              </div>
              <div className="forminput_cont">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="formerror">{errors.password}</span>
                )}
              </div>
  
              <button type="submit" className="main_button">
                Login
              </button>
  
              <p className="authlink">
                Don't have an account? <Link to="/auth/signup">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Signin;