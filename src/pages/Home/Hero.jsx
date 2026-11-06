import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat puma-container h-[380px] sm:h-[460px] lg:h-[525px] flex items-end justify-end pb-8 md:pb-10 lg:pb-16 pl-4 md:pl-10 lg:pl-16"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}hero-bg.avif')` }}
    >
      <div className="text-white">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold">NEVER NOT SUEDE</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">SUEDE BLOOM</p>

        <div className="font-heading flex flex-wrap items-center gap-3 md:gap-4 mt-6">
          <Link to="/women" className="bg-puma-white text-puma-black font-bold uppercase py-2 px-5">shop women</Link>
          <Link to="/men" className="bg-puma-white text-puma-black font-bold uppercase py-2 px-5">shop men</Link>
          <Link to="/kids" className="bg-puma-white text-puma-black font-bold uppercase py-2 px-5">shop kids</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
