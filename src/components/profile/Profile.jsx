import React ,{useState}from 'react'
import './profile.css'

const Profile  = () => {
    const [bookings, setBookings] =useState([])
    const [user, setUser] = useState(null)

    const getBookings = async () => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/movie/getuserbookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setBookings(data.data)
                    // console.log(bookings)
                }
                else {
                    console.log(data)
                }
            }
            )
    }

    const getUserData = async () => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setUser(data.data)

                    // {
                    //     "_id": "651c19f156b991c66296fb73",
                    //     "name": "Harshal Jain",
                    //     "password": "$2b$08$17hG5iNfG7PbSX7BpGNRNe2m7uCB56F2Oy5hOhF113z5PT8pUUCM.",
                    //     "email": "virajj014@gmail.com",
                    //     "bookings": [
                    //         "651d70e7c54f60ba058333d2",
                    //         "651d7171559a5aaef26eba47"
                    //     ],
                    //     "createdAt": "2023-10-03T13:41:05.175Z",
                    //     "updatedAt": "2023-10-04T14:06:41.729Z",
                    //     "__v": 2,
                    //     "city": "Jabalpur"
                    // }
                }
                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getBookings()
        getUserData()
    }, [])
    console.log(bookings)

    
    return (
        <div className='profile'>
            <h1 className='head'>Profile</h1>
            <div className='user'>
                <h2>User Details</h2>
                <div className='details'>
                    <div className='detail'>
                        <h3>Name</h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className='detail'>
                        <h3>Email</h3>
                        <p>{user?.email}</p>
                    </div>

                    <div className='detail'>
                        <h3>City</h3>
                        <p>{user?.city}</p>
                    </div>
                </div>


            </div>
            <div className='bookings'>
                <h2>Bookings</h2>
                    
                <div className='details'>
                    {
                        
                        bookings?.map((booking) => {
                            return booking &&(
                                <div className='booking' key={booking._id}>
                                    <div className='detail'>
                                        <h3>Movie</h3>
                                        <p>{booking.movieId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Screen</h3>
                                        <p>{booking.screenId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Seats</h3>
                                        <p>{booking.seats.map((seat, index) => {
                                            return (
                                                <span 
                                                key={index}
                                                >{seat.seat_id}, </span>
                                            )
                                        }
                                        )}</p>
                                    </div>

                                    <div className='detail'>

                                        <h3>Price</h3>
                                        <p>{booking.totalPrice}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Type</h3>
                                        <p>{booking.paymentType}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Id</h3>
                                        <p>{booking.paymentId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Date</h3>
                                        <p>{booking.showDate}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Time</h3>
                                        <p>{booking.showTime}</p>
                                    </div>



                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile