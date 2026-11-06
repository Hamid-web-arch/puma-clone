import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import LocationSelectorModal from '../../components/LocationSelectorModal'
import { FieldLabel, PasswordField, SubmitButton, TermsNotice, ErrorText } from '../../components/AccountFormFields'
import { useAuth } from '../../hooks/useAuth'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { flagUrl } from '../../data/locations'

const accountLinks = [
    { label: 'My Account', to: '/account' },
    { label: 'Returns', to: '/returns' },
    { label: 'Contact Us', to: '/contact-us' },
    { label: 'Wishlist', to: '/wishlist' },
]

function LoginPanel({ onSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isSubmitting } = useAuth()

    const isDisabled = !email.trim() || !password.trim()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = await login(email, password)
        if (user) onSuccess()
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <FieldLabel>Email</FieldLabel>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                />
            </div>

            <div>
                <FieldLabel>Password</FieldLabel>
                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <ErrorText>{error}</ErrorText>

            <SubmitButton disabled={isDisabled || isSubmitting}>Login</SubmitButton>

            <a href="#" className="font-bold text-sm underline">Forgotten your password?</a>
        </form>
    )
}

function JoinPanel({ onSuccess }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [joinMailingList, setJoinMailingList] = useState(true)
    const { register, error, isSubmitting } = useAuth()

    const isDisabled = !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = await register({ firstName, lastName, email, password, joinMailingList })
        if (user) onSuccess()
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <FieldLabel>First Name</FieldLabel>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                />
            </div>

            <div>
                <FieldLabel>Last Name</FieldLabel>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                />
            </div>

            <div>
                <FieldLabel>Email</FieldLabel>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-puma-border px-4 py-3 outline-none placeholder:text-puma-gray"
                />
            </div>

            <div>
                <FieldLabel>Password</FieldLabel>
                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                    type="checkbox"
                    checked={joinMailingList}
                    onChange={(e) => setJoinMailingList(e.target.checked)}
                    className="w-4 h-4"
                />
                Add me to the PUMA mailing list
            </label>

            <TermsNotice />

            <ErrorText>{error}</ErrorText>

            <SubmitButton disabled={isDisabled || isSubmitting}>Create Account</SubmitButton>
        </form>
    )
}

function AccountDropdown({ onAuthSuccess }) {
    const [view, setView] = useState('menu')
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const user = useCurrentUser()

    function handleLogout() {
        localStorage.removeItem('puma_user')
        window.dispatchEvent(new Event('auth-changed'))
    }

    if (view === 'login' || view === 'join') {
        return (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-puma-white text-puma-black border border-puma-border shadow-lg p-4 z-50 normal-case">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setView('menu')} aria-label="Back" className="cursor-pointer">
                        <IoIosArrowBack size={20} />
                    </button>
                    <h2 className="font-heading font-bold text-lg">
                        {view === 'login' ? 'Login' : 'Join Us'}
                    </h2>
                </div>

                {view === 'login' ? (
                    <LoginPanel onSuccess={onAuthSuccess} />
                ) : (
                    <JoinPanel onSuccess={onAuthSuccess} />
                )}
            </div>
        )
    }

    return (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-puma-white text-puma-black border border-puma-border shadow-lg p-4 z-50 normal-case">
            <ul>
                {accountLinks.map(({ label, to }) => (
                    <li key={label} className="border-b border-puma-border">
                        <Link to={to} className="block py-3 text-base hover:text-puma-gray transition-colors">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => setIsLocationOpen(true)}
                className="flex items-center justify-between w-full py-3 cursor-pointer"
            >
                <span className="text-base">Language</span>
                <span className="flex items-center gap-2 text-base">
                    EN
                    <img src={flagUrl('us')} alt="United States" className="w-5 h-4 object-cover rounded-sm" />
                </span>
            </button>

            {user ? (
                <div className="mt-2">
                    <p className="text-base py-1">Hello, {user.firstName}</p>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full h-10 border border-puma-gray font-bold uppercase text-sm mt-2 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setView('login')}
                        className="flex items-center justify-center w-full h-10 bg-puma-black text-puma-white font-bold uppercase text-sm mt-2 cursor-pointer"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setView('join')}
                        className="flex items-center justify-center w-full h-10 border border-puma-gray font-bold uppercase text-sm mt-2 cursor-pointer"
                    >
                        Join Us
                    </button>
                </>
            )}

            {isLocationOpen && <LocationSelectorModal onClose={() => setIsLocationOpen(false)} />}
        </div>
    )
}

export default AccountDropdown
