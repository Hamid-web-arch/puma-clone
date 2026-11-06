import React from 'react'
import { Link } from 'react-router-dom'
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiOutlineHeart,
    HiOutlineMapPin,
    HiOutlineCreditCard,
    HiOutlineCog6Tooth,
} from 'react-icons/hi2'

const sidebarLinks = [
    { label: 'Account Overview', icon: HiOutlineUser, to: '/account' },
    { label: 'My Orders', icon: HiOutlineShoppingBag, to: '/account/orders' },
    { label: 'Wishlist', icon: HiOutlineHeart, to: '/wishlist' },
    { label: 'Addresses', icon: HiOutlineMapPin, to: '/account/addresses' },
    { label: 'Cards', icon: HiOutlineCreditCard, to: '/account/cards' },
    { label: 'Account Settings', icon: HiOutlineCog6Tooth, to: '/account/settings' },
]

const helpLinks = [
    { label: 'Shipping & Delivery', to: '#' },
    { label: 'Returns & Exchanges', to: '/returns' },
    { label: 'Contact Us', to: '/contact-us' },
]

function AccountSidebar({ active, user, onLogout }) {
    return (
        <aside className="w-full md:w-64 shrink-0">
            <ul>
                {sidebarLinks.map(({ label, icon: Icon, to }) => (
                    <li key={label}>
                        <Link
                            to={to}
                            className={`flex items-center gap-3 py-3 border-l-2 pl-3 transition-colors ${label === active ? 'border-puma-black font-bold' : 'border-transparent text-puma-gray hover:text-puma-black'}`}
                        >
                            <Icon size={20} />
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <p className="font-heading font-bold text-lg mt-10 mb-3">Need Help?</p>
            <ul className="space-y-2 text-sm">
                {helpLinks.map(({ label, to }) => (
                    <li key={label}>
                        <Link to={to} className="text-puma-gray hover:text-puma-black hover:underline">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            {user && (
                <button onClick={onLogout} className="mt-8 text-sm font-bold underline cursor-pointer">
                    Logout
                </button>
            )}
        </aside>
    )
}

export default AccountSidebar
