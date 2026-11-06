import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitButton } from '../../components/AccountFormFields'

const returnsNavLinks = [
    { label: 'New Arrivals', to: '/' },
    { label: 'Women', to: '/women' },
    { label: 'Men', to: '/men' },
    { label: 'Kids', to: '/kids' },
    { label: 'Sport', to: '/sport' },
    { label: 'Sale', to: '/sale' },
]

function ReturnsHeader() {
    return (
        <header className="bg-puma-black text-white h-16 flex items-center">
            <div className="puma-container flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center shrink-0">
                    <img src="/puma-logo.svg" alt="Logo" className="h-8 w-8 invert" />
                </Link>
                <nav className="hidden sm:flex items-center gap-4 lg:gap-6 font-heading text-sm overflow-x-auto">
                    {returnsNavLinks.map(({ label, to }) => (
                        <Link key={label} to={to} className="shrink-0 hover:text-puma-gray transition-colors">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

function ReturnsPage() {
    const [orderNumber, setOrderNumber] = useState('')
    const [billingEmail, setBillingEmail] = useState('')

    const isDisabled = !orderNumber.trim() || !billingEmail.trim()

    return (
        <div>
            <ReturnsHeader />

            <div className="flex flex-col md:flex-row min-h-[600px]">
                <div className="w-full md:w-[420px] shrink-0 px-6 md:px-12 py-10">
                    <h1 className="font-heading text-3xl font-bold mb-2">Return</h1>
                    <p className="text-puma-gray mb-6">Enter your order information to get started.</p>

                    <a href="#" className="block font-bold text-sm underline mb-6">
                        Need help finding your order number?
                    </a>

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            placeholder="Order Number"
                            className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                        />
                        <input
                            type="email"
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            placeholder="Billing Email"
                            className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                        />

                        <SubmitButton disabled={isDisabled}>Next</SubmitButton>

                        <a href="#" className="font-bold text-sm underline">Our Return Policy</a>
                    </form>
                </div>

                <div
                    className="hidden md:block flex-1 bg-cover bg-center"
                    style={{ backgroundImage: "url('/returns-bg.jpg')" }}
                />
            </div>
        </div>
    )
}

export default ReturnsPage
