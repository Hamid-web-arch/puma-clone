import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountDropdown from './AccountDropdown'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'

function HeaderActions() {
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const accountRef = useRef(null)
    const { itemCount } = useCart()
    const { itemCount: wishlistCount } = useWishlist()

    useEffect(() => {
        function closeOnOutsideClick(event) {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsAccountOpen(false)
            }
        }
        document.addEventListener('mousedown', closeOnOutsideClick)
        return () => document.removeEventListener('mousedown', closeOnOutsideClick)
    }, [])

    return (
        <div className="flex items-center gap-2">

            <Link to="/search" className="flex items-center cursor-pointer border border-puma-gray h-10 px-3 lg:px-4 rounded-sm transition-colors hover:border-white">
                <div className="flex items-center space-x-2">
                    <img src={`${import.meta.env.BASE_URL}search.svg`} alt="Search" className="w-6 h-6 invert" />
                    <span className="hidden lg:inline uppercase font-heading font-bold text-base">search</span>
                </div>
            </Link>
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-[#5c5c5c] transition-colors">
                <img src={`${import.meta.env.BASE_URL}heart.svg`} alt="Heart" className="w-6 h-6 invert" />
                {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-puma-red text-white text-[11px] font-bold rounded-full">
                        {wishlistCount}
                    </span>
                )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#5c5c5c] transition-colors">
                <img src={`${import.meta.env.BASE_URL}cart.svg`} alt="Cart" className="w-6 h-6 invert" />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-puma-red text-white text-[11px] font-bold rounded-full">
                        {itemCount}
                    </span>
                )}
            </Link>

            <div ref={accountRef} className="relative">
                <button
                    onClick={() => setIsAccountOpen((open) => !open)}
                    className={`p-2 rounded-full transition-colors ${isAccountOpen ? 'bg-[#5c5c5c]' : 'hover:bg-[#5c5c5c]'}`}
                >
                    <img src={`${import.meta.env.BASE_URL}person.svg`} alt="Person" className="w-6 h-6 invert" />
                </button>
                {isAccountOpen && <AccountDropdown onAuthSuccess={() => setIsAccountOpen(false)} />}
            </div>

        </div>
    )
}

export default HeaderActions