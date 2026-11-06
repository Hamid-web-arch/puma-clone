import React from 'react'
import { Link } from 'react-router-dom'

function TopAnnouncementBar() {
    return (
        <div className="text-puma-black text-sm font-extrabold uppercase text-center py-2.5 font-heading">
            <div className="flex items-center justify-center space-x-3">
                <p>Free shipping on orders 60$+</p>
                <Link to="/sale" className="underline">see details</Link>
            </div>
        </div>
    )
}

export default TopAnnouncementBar