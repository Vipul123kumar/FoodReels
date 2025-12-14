import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserRegister from '../Pages/UserRegister'
import UserLogin from '../Pages/UserLogin'
import PartnerLogin from '../Pages/PartnerLogin'
import PartnerRegister from '../pages/PartnerRegister'
import Home from '../Pages/Home'
import CreateFood from '../food-partner/CreateFood'
import Profile from '../food-partner/Profile'

const AppRoutes = () => {
  return (
       <Router>
         <Routes>
             <Route path='/user/register' element={<UserRegister/>}/>
             <Route path='/user/login' element={<UserLogin/>}/>  
             <Route path='/food-partner/register' element={<PartnerRegister/>}/>
             <Route path='/food-partner/login' element={<PartnerLogin/>}/>
             <Route path='/' element={<Home/>}/>
             <Route path='/create-food' element={<CreateFood/>}/>
              <Route path='food-partner/:id' element={<Profile/>}/>

              {/* <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<><Home /><BottomNav /></>} />
                <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/food-partner/:id" element={<Profile />} /> */}
         </Routes>
       </Router>
  )
}
 
export default AppRoutes
