import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/customer/Services';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, authResolved } from './redux/slices/authSlice';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { fetchServices } from './redux/slices/serviceSlice';
import Workers from './pages/customer/Workers';
import WorkerAllBookings from "./pages/worker/WorkerAllBookings";
import WorkerDetails from './pages/customer/WorkerDetails';
import BookService from './pages/customer/BookService';
import MyBookings from './pages/customer/MyBookings';
import BookingDetails from './pages/customer/BookingDetails';
import WorkerAllJob from './pages/worker/WorkerAllJob';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import BlockWorkerRoute from './routes/BlockWorkerRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUser());
    } else {
      dispatch(authResolved()); // 👈 REQUIRED
    }

    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Not Logged In */}
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* Common Routes for all */}
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route element={<BlockWorkerRoute />}>
          <Route path='/services' element={<Services />} />
        </Route>

        {/* Common Routes for both customer and worker */}
        <Route element={<ProtectedRoute />}>
          <Route path='/notifications' element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Customer Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path='/services/:slug' element={<Workers />} />
          <Route path='/worker/:id' element={<WorkerDetails />} />
          <Route path='/book/:workerid' element={<BookService />} />
          <Route path='/mybookings' element={<MyBookings />} />
          <Route path='/mybookings/:bookingid' element={<BookingDetails />} />
        </Route>

        {/* Worker Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={["worker"]} />}>
          <Route path="/worker/bookings" element={<WorkerAllBookings />} />
          <Route path="/myjobs" element={<WorkerAllJob />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
