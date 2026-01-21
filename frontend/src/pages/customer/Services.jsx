import React, { useEffect} from 'react'
import './css/Services.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../../redux/slices/serviceSlice'
const Services = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { list: services, loading, error, fetched } = useSelector(state => state.services)

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchServices())
    }
  }, [dispatch, fetched])

  if (loading) {
    return <p className="loadingText">Loading services...</p>
  }

  if (error) {
    return <p className="errorText">{error}</p>
  }
  return (
    <div className='servicesPage'>
      <section className="serviceGrid categoriesGrid">
        {services?.map((service) => (
          <div key={service._id} className="categoryBox">
            <img src={`/static/images/services/${service.name}.jpg`} alt="" />
            <div className="aboutCategory">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <Link to={
              `${!user ? '/login' : `/services/${service.slug}`}`
            } className="primaryBtn">View Details</Link>
          </div>
        ))
        }
      </section>
    </div>
  )
}

export default Services
