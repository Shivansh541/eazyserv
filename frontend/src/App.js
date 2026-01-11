import {
BrowserRouter,
Route,
Routes
} from 'react-router-dom'
import Home from './pages/Home'
<<<<<<< HEAD
=======
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './redux/slices/authSlice';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { fetchServices } from './redux/slices/serviceSlice';
import Workers from './pages/customer/Workers';
import WorkerHome from "./pages/worker/WorkerHome";
import WorkerAllBookings from "./pages/worker/WorkerAllBookings";
import WorkerAllJob from "./pages/worker/WorkerAllJob";


import WorkerDetails from './pages/customer/WorkerDetails';
import BookService from './pages/customer/BookService';
import MyBookings from './pages/customer/MyBookings';
import BookingDetails from './pages/customer/BookingDetails';


>>>>>>> a2eddab (Add worker jobs page and update App.js)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/services/:slug' element={<Workers/>}/>
        <Route path="/worker/home" element={<WorkerHome />} />
        <Route path="/worker/bookings" element={<WorkerAllBookings />} />
        <Route path="/myjobs" element={<WorkerAllJob />} />

        


        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services/:slug' element={<Workers />} />
        <Route path='/worker/:id' element= {<WorkerDetails/>}/>
        <Route path='/book/:workerid' element={<BookService/>}/>
        <Route path='/mybookings' element={<MyBookings/>}/>
        <Route path='/mybookings/:bookingid' element={<BookingDetails/>}/>
>>>>>>> a2eddab (Add worker jobs page and update App.js)
      </Routes>
    </BrowserRouter>
  );
}

export default App;
