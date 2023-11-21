import React ,{useState} from 'react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from "../Navbar/logo.png"
import { Link } from 'react-router-dom';
import "../Navbar/navbar.css"
import LocationPopup from '../popups/location/LocationPopup';

const Navbar = () => {
    const [showLocationPopup, setShowLocationPopup] = useState(false);

    const [user, setUser] = React.useState(null)
    const [loggedIn, setLoggedIn] = React.useState(false)
    const getuser = async () => {

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/getuser`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            const response = await res.json();
            setUser(response.data);
          } catch (error) {
            console.log(error);
          }

    }

    const handleLogout = async () => {
        
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/logout`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            const response = await res.json();
            if (response.ok) {
              window.location.href = '/auth/signin';
            }
          } catch (error) {
            console.log(error);
            window.location.href = '/auth/signin';
          }
    }

    const checkLogin = async () => {
        // let authToken = await getCookie('authToken')
        // let refreshToken = await getCookie('refreshToken')

        // console.log(authToken, refreshToken)
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/checklogin`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            const response = await res.json();
            if (response.ok) {
              setLoggedIn(true);
            } else {
              setLoggedIn(false);
            }
          } catch (error) {
            console.log(error);
            setLoggedIn(false);
          }
    }

    React.useEffect(() => {
        checkLogin()
        getuser()
    }, [])

  return (
    <div>
      <nav>
            <div className='left'>
                <img src={logo} alt="logo" width={100} height={100}
                    onClick={()=>window.location.href="/"}
                />
                <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search For a Movie" />
                </div>
            </div>
            <div className='right'>
                <p className='dropdown'
                    onClick={()=>setShowLocationPopup(true)}
                    >
                    {user && user.city ? user.city  : "Select City"}
                     <RiArrowDropDownFill className="dropicon" /></p>
               {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                        :
                        <Link to="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>

               }
                <Link to="/profile" className='linkstylenone'>
                    <BiUserCircle className='theme_icon1' />
                </Link>
            </div>
            {
                showLocationPopup &&
                <LocationPopup
                    setShowLocationPopup={setShowLocationPopup}
                />
            }
        </nav>
    </div>

  )
}

export default Navbar