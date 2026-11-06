import React from 'react'
import Navbar from './Navbar'
import HeaderActions from './HeaderActions'

function Header() {
  return (
    <div>
    
    <div className="bg-puma-black relative">
      <header className="puma-container text-white h-20 font-heading tracking-wider flex items-center justify-between ">
        <Navbar />
        <HeaderActions />
      </header>
    </div>

    </div>
  )
}

export default Header