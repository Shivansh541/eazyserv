import React from 'react'
import './css/Home.css'
import { useSelector } from 'react-redux'
import CustomerHome from './customer/CustomerHome'
import WorkerHome from './worker/WorkerHome'
import PublicHome from './public/PublicHome'
const Home = () => {
  const user = useSelector((state) => state.auth.user)
  if (!user) return <PublicHome/>
  if(user.role === "customer") return <CustomerHome/>
  if(user.role === "worker") return <WorkerHome/>
}

export default Home
