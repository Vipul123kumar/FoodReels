import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserRegister = () => {
    const navigate=useNavigate();
  const handleSubmit= async(e)=>
  {
    e.preventDefault();
    const fullName=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
 
   const res= await axios.post("http://localhost:3000/api/auth/user/register",
        {
            fullName:fullName,
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
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Register as a user</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" placeholder="Jane Doe" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" />

          <button type="submit" className="btn-primary">Create account</button>
        </form>
        <p className="auth-footer">Register as: <Link to="/">User</Link> · <Link to="/food-partner/register">Food Partner</Link></p>
      </section>
    </main>
  )
}

export default UserRegister
