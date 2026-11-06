import React from 'react'
import AccountLayout from '../../components/AccountLayout'

function AccountOrdersPage() {
    return (
        <AccountLayout active="My Orders">
            <h1 className="font-heading text-3xl font-bold mb-6">My Orders</h1>

            <div className="max-w-xs mb-6">
                <p className="text-sm font-bold uppercase tracking-wide mb-2">Select Date</p>
                <select className="w-full border border-puma-border px-4 py-3 outline-none cursor-pointer">
                    <option>Last six months</option>
                </select>
            </div>

            <p className="font-bold">No orders found for that time period</p>
        </AccountLayout>
    )
}

export default AccountOrdersPage
