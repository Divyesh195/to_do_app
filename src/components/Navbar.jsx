import React from 'react'

export default function Navbar() {
  return (
    <nav className='bg-green-700 text-white  text-xl drop-shadow font-bold flex items-center justify-between py-3'>
        <h2 className='ms-10 cursor-pointer'>TO DO APP</h2>
        <div className="text-xl font-bold">
        <button type="button" className="btn btn-light font-bold bg-green-600 hover:bg-green-900 hover:text-white border-0 me-10">Dark Mode</button>
        </div>
    </nav>
  )
}
