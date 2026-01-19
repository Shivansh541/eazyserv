import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomerProfile from './customer/CustomerProfile'
import WorkerProfile from './worker/WorkerProfile'

const Profile = () => {
    const navigate = useNavigate()
    const user = useSelector((state)=>state.auth.user)
    if(!user){
        navigate('/login')
        return;
    }
    if(user.role === 'customer') return <CustomerProfile/>
    if(user.role === 'worker') return <WorkerProfile/>
    
}

export default Profile
