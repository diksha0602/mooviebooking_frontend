import React ,{useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {toast} from "react-toastify";
import { ToastContainer } from 'react-toastify';
import logo from "../../Navbar/logo.png"
import "../auth.css"


const FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: ''
  };

const Signup = () => {
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

        console.log(formData)
        setErrors({})

        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.city) {
            validationErrors.city = 'City is required';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        fetch(`${process.env.REACT_APP_BACKEND_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.ok) {
                    toast(response.message, {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 2000
                    })
                    window.location.href("'/auth/signin'")
                    setFormData(
                        {
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            city: ''
                        }
                    )
                } else {
                    toast(response.message, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 2000
                    });
                }
            })
            .catch((error) => {
                console.log(process.env.REACT_APP_BACKEND_API)
                toast(error.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            })

        // Additional logic for form submission...
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
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="formerror">{errors.name}</span>}
                        </div>
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
                        <div className="forminput_cont">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Your Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <span className="formerror">{errors.confirmPassword}</span>
                            )}
                        </div>

                        <div className="forminput_cont">
                            <label>City</label>
                            <input
                                type="text"
                                placeholder="Enter Your City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && (
                                <span className="formerror">{errors.city}</span>
                            )}
                        </div>

                        <button type="submit" className="main_button">Register</button>
                        <p className='authlink'>Already have an account? <Link to="/auth/signin">login</Link></p>
                    </form>
                </div>
          </div>
        </div>
      );
    };



export default Signup