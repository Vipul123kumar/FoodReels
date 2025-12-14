import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate= useNavigate();
  const handleSubmit= async(e)=>
  {
    e.preventDefault();
   // const fullName=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
 
   const res= await axios.post("http://localhost:3000/api/auth/user/login",
        {
           // fullName:fullName,
            email:email,
            password:password,


        },{
            withCredentials:true
        }
    )
    console.log( res.data);
    navigate("/")
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" />

          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  )
}

export default UserLogin
