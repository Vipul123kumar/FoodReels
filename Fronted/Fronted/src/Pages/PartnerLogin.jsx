import React from 'react'
import '../styles/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {
   const navigate=useNavigate();
      const handleSubmit= async(e)=>
      {
        e.preventDefault();
       
        const email=e.target.email.value;
       
        const password=e.target.password.value;
       
     
       const res= await axios.post("http://localhost:3000/api/auth/food-partner/login",
            {
              
                email:email,
                password:password,
              
            },{
                withCredentials:true
            }
        )
        console.log( res.data);
        navigate("/create/food")
      }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Access your partner dashboard</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Business email</label>
          <input id="email" name="email" type="email" placeholder="contact@biz.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" />

          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  )
}

export default PartnerLogin
