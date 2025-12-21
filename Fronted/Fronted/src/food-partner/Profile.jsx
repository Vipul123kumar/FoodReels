import React from 'react'

import '../styles/profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const Profile = () => {
// const {id}=useParams();
 const params = useParams();
const id = params.foodPartnerId;
console.log("fronted",id);


 const [profile,setProfile]=useState(null)
 const videos=Array.from({length:9},(_,i)=>({id:i+1}))

 useEffect(()=>{
    if(!id) return ;
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials:true})
    .then (response=>{
        
        setProfile(response.data.foodPartner)
        console.log("Response",response);
        
    }) 
     .catch(err => {
        console.log("deg");
        
      console.log("GET ERROR:", err.response?.data || err);
    });
 },[id])
  return (

       <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.name}
                            {/* profile name */}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                            {/* profile address */}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">
                            {/* {profile?.totalMeals} */}
                            total meals
                            </span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">
                            {/* {profile?.customersServed} */}
                            customer saved
                            </span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

        </main>
  )
}

export default Profile
