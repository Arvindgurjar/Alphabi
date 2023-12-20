"use client"
import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import { auth } from '@/config/config';
const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setLoginData({ ...loginData, [name]: value });
  }

  const submitFormData = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth,loginData.email,loginData.password)
    .then((res)=>{router.push("/")})
    .catch((err)=>{console.log(err);alert("Invalid credentials")})
    
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       router.push("/")
      } 
    });
  },[])
  return (
      <div className="container">
        <div className="row formContainer">
          <div className="col-12 col-md-6 shadow p-3 rounded">
            <h4 className='text-center fw-bold'>Login Form</h4>
            <form action="" onSubmit={submitFormData}>
              <div className='my-1'>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" className='form-control' value={loginData.email} onChange={handleChange} required placeholder='Email'/>
              </div>
              <div className='my-1'>
                <label htmlFor="password" className="form-label">Password</label>
                <div className='d-flex align-items-center form-control'>
                  <input type={!showPassword ? "password" : "text"} name="password" id="password" style={{ outline: "none", border: "none", width: "95%" }} value={loginData.value} onChange={handleChange} required placeholder='Password'/>
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </div>
              <div className='my-4 text-center'>
                <button type='submit' className='btn btn-dark w-100' >Login</button>
                <Link href="/signup"><p className='mt-3'>Sign Up</p></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login