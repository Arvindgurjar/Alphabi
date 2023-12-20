"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/config"
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")
  const [signUpData, setSignUpData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setSignUpData({ ...signUpData, [name]: value });
  }

  const submitFormData = (e) => {
    e.preventDefault()
    // console.log(signUpData.fname + "  " + signUpData.lname + " " + signUpData.email + " " + signUpData.password)
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          fname: signUpData.fname,
          lname: signUpData.lname
        })
        signOut(auth);
        router.push("/login");
      })
      .catch((err) => { setError(err.message) })
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/")
      }
    });
  }, [])
  return (
    <div className="container">
      <div className="row formContainer">
        <div className="col-12 col-md-6 shadow p-3 rounded">
          <h4 className='text-center fw-bold my-2'>SignUp Form</h4>
          <form action="" onSubmit={submitFormData}>
            <div className='my-1'>
              <label htmlFor="fname" className="form-label">First Name</label>
              <input type="fname" name="fname" id="fname" className='form-control' value={signUpData.fname} onChange={handleChange} required placeholder='First Name' />
            </div>
            <div className='my-1'>
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input type="lname" name="lname" id="lname" className='form-control' value={signUpData.lname} onChange={handleChange} required placeholder='Last Name' />
            </div>
            <div className='my-1'>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" id="email" className='form-control' value={signUpData.email} onChange={handleChange} required placeholder='Email' />
            </div>
            <div className='my-1'>
              <label htmlFor="password" className="form-label">Password</label>
              <div className='d-flex align-items-center form-control'>
                <input type={!showPassword ? "password" : "text"} name="password" id="password" style={{ outline: "none", border: "none", width: "95%" }} value={signUpData.value} onChange={handleChange} required placeholder='Password' />
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
            <div className='text-center'>
              <small style={{ fontWeight: "bolder", color: "red" }}>{error}</small>
            </div>
            <div className='my-4 text-center'>
              <button type='submit' className='btn btn-dark w-100' >Register</button>
              <Link href="/login"><p className='mt-3'>Already Register</p></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page