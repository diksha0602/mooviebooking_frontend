import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomeSlider from './components/HomeSlider/HomeSlider';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import MovieCard from './components/MovieCarousel/MovieCard';
import MoviePage from './components/MoviePage/MoviePage.jsx';
import Bookingpage from './components/Booking/Bookingpage.jsx';
import Screen from './components/Screen/Screen.jsx';
import Signin from './components/auth/signin/signin.jsx';
import Signup from './components/auth/signup/signup.jsx';
import Profile from './components/profile/Profile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <section>
      <Navbar />
      <Routes>
           <Route path="/" element={[<HomeSlider />,<MovieCarousel />]} />
           {/* <Route path={`/pages/:city/movies/${title}`} element={[<MoviePage />]} /> */}
           <Route path="/:city/movies/:_id" element={<MoviePage />} />
           {/* <Route path="/:pathname/buytickets" element={<Bookingpage />} /> */}
           <Route path="/:city/movies/:_id/buytickets" element={<Bookingpage />} />
           <Route path="/:city/movies/:_id/buytickets/:screenid" element={<Screen />} />
           <Route path="/auth/signup" element={<Signup />} />
           <Route path="/auth/signin" element={<Signin />} />
           <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
      </section>
    </div>
  );
}

export default App;
