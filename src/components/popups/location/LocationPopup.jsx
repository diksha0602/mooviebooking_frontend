import React from 'react'
import Select from 'react-select'
import '../Popup.css'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'

const LocationPopup = (
    {
        setShowLocationPopup
    }
) => {

    const [cities, setCities] = React.useState([])


    const [selectedCity, setSelectedCity] = React.useState(null)

    const getcities = async () => {
        const indianCities = [
            "Jabalpur",
            "Mumbai",
            "Delhi",
            "Bangalore",
            "Hyderabad",
            "Chennai",
            "Kolkata",
            "Pune",
            "Ahmedabad",
            "Jaipur",
            "Surat",
            "Lucknow",
            "Kanpur",
            "Nagpur",
            "Indore",
            "Thane",
            "Bhopal",
            "Visakhapatnam",
            "Pimpri-Chinchwad",
            "Patna",
            "Vadodara"
        ];

        const cities = indianCities.map((city) => {
            return {
                label: city,
                value: city
            }

        })

        setCities(cities)
    }

    React.useEffect(() => {
        getcities()
    }, [])

    const handleSave = () =>{
        // setShowLocationPopup(false)
        fetch(`${process.env.REACT_APP_BACKEND_API}/auth/changeCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                city: selectedCity
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(cities.label)
                if (data.ok) {
                    // toast(data.message, {
                    //     type: 'success'
                    // })
                    setShowLocationPopup(false)
                    window.location.reload()
                }
            })
            .catch((err) => {   
                toast(err.message, {
                    type: 'error'
                })
                console.log(err)
            })
    }

  return (
    <div className='popup-bg'>
            <div className='popup-cont'>
                <select
                    className='select'
                    onChange={(e) => {
                        setSelectedCity(e.target.value)
                    }}
                >
                    <option value="" disabled selected>Select your city</option>
                    {
                        cities.map((city) => {
                            return <option key={city.value} value={city.value}>{city.label}</option>
                        })
                    }
                </select>

                <button className='btn'
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
  )
}

export default LocationPopup