import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PartnerRegister = () => {
      const navigate=useNavigate();
      const handleSubmit= async(e)=>
      {
        e.preventDefault();
       // const fullName=e.target.name.value;
       const business=e.target.business.value;
        const email=e.target.email.value;
        const phone=e.target.phone.value;
        const password=e.target.password.value;
        const contactName=e.target.contactName.value;
        const address=e.target.address.value;
     
        const res= await axios.post("http://localhost:3000/api/auth/food-partner/register",
            {   
               // fullName:fullName,
                name:business,
                email:email,
                password:password,
                phone:phone,
                address:address,
                contactName:contactName

            },{
                withCredentials:true
            }
        )
        console.log( res.data);
        navigate("/food-partner/login")
      }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign up</h1>
        <p className="auth-sub">Register your food partner account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="business">Business name</label>
          <input id="business" name="business" type="text" placeholder="Pizza Place" />

          <label htmlFor="email">Business email</label>
          <input id="email" name="email" type="email" placeholder="contact@biz.com" />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="Phone" type="no" placeholder="9222" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" />

           <label htmlFor="ContactName">Contact Name</label>
          <input id="contactName" name="contactName" type="text" placeholder="vipul" />


          <label htmlFor="address">address</label>
          <input id="address" name="address" type="text" placeholder="••••••••" />


          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="auth-footer">Register as: <Link to="/">User</Link> · <Link to="/food-partner/register">Food Partner</Link></p>
      </section>
    </main>
  )
}

export default PartnerRegister
