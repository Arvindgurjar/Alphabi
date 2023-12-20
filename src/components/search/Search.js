import { auth } from '@/config/config'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useRouter } from 'next/navigation'
import "./search.css"
const Search = (props) => {
    const router = useRouter()
    const logoutUser = ()=>{
        signOut(auth);
        router.push("/login")
    }
  return (
    <div className='my-5 mx-3 d-flex justify-content-center alihn-items-center'>
        <input type="text" name="search" id="search" placeholder='Artical name or keyword...' value={props.val} onChange={props.handleSearch} className='input'/>
        <button>Search</button>
        <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Search