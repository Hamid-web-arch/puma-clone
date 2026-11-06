import React from 'react'
import { Link } from 'react-router-dom'

function PromoBanner({ gray }) {
  const bgClass = gray ? 'bg-[#dde0e3]' : 'bg-puma-promo'

  return (
    <div className={`${bgClass} text-puma-black font-bold uppercase tracking-wider font-heading py-4`}>
      <div className="flex flex-col items-center justify-center  text-center">
        <p className='text-xl'>PRIVATE SALE</p>
        <p className='text-sm'>OUR WORST KEPT SECRET: UP TO 50% OFF</p>
        <div className="flex gap-2 underline text-sm">
          <Link to="/sale">shop now</Link>
          <Link to="/sale">see details</Link>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner