import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
  <div className="grid grid-cols-2 items-center px-6 py-4 bg-red-300 text-white">
  
  {/* Logo / Title */}
  <div>
    <h1 className="text-2xl font-bold tracking-wide">
      NEWS
    </h1>
    <p className="text-sm text-gray-400">
      Bringing you the latest news from across the globe
    </p>
  </div>

  {/* Navigation Links */}
  <div className="flex justify-end gap-6 font-medium">
    <Link to="/" className="hover:text-blue-400 transition">
      Home
    </Link>
    <Link to="/services" className="hover:text-blue-400 transition">
      News
    </Link>
    <Link to="/login" className="hover:text-blue-400 transition">
      Login
    </Link>
  </div>

</div>

  )
}

export default Navbar
