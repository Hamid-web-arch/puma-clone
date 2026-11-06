import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FieldLabel, PasswordField, SubmitButton, TermsNotice, ErrorText } from '../../components/AccountFormFields'
import ProductCarousel from '../../components/ProductCarousel'
import AccountSidebar from '../../components/AccountSidebar'
import PageLoader from '../../components/PageLoader'
import { useAuth } from '../../hooks/useAuth'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useProducts } from '../../hooks/useProducts'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const { login, error, isSubmitting } = useAuth()
    const navigate = useNavigate()

    const isDisabled = !email.trim() || !password.trim()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = await login(email, password)
        if (user) navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[512px] mx-auto flex flex-col gap-6">
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                />
                Remember me on this computer
            </label>

            <ErrorText>{error}</ErrorText>

            <SubmitButton disabled={isDisabled || isSubmitting}>Login</SubmitButton>

            <TermsNotice />

            <a href="#" className="font-bold text-sm underline">Forgotten your password?</a>
        </form>
    )
}

function JoinForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [joinMailingList, setJoinMailingList] = useState(true)
    const { register, error, isSubmitting } = useAuth()
    const navigate = useNavigate()

    const isDisabled = !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = await register({ firstName, lastName, email, password, joinMailingList })
        if (user) navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[512px] mx-auto flex flex-col gap-6">
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

function AccountOverview({ user, onLogout }) {
    const { products, isLoading, error } = useProducts()

    return (
        <div className="puma-container py-10 flex flex-col md:flex-row gap-12">
            <AccountSidebar active="Account Overview" onLogout={onLogout} />

            <div className="flex-1 min-w-0">
                <h1 className="font-heading text-4xl font-bold">Hello, {user.firstName}</h1>
                <p className="text-puma-gray mt-1">Account Overview</p>

                {isLoading && <PageLoader />}

                {!isLoading && !error && (
                    <ProductCarousel
                        title="Recommended For You"
                        products={products}
                        className="pt-10 relative product-carousel"
                    />
                )}
            </div>
        </div>
    )
}

function AccountPage() {
    const [searchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'join' ? 'join' : 'login')
    const user = useCurrentUser()

    function handleLogout() {
        localStorage.removeItem('puma_user')
        window.dispatchEvent(new Event('auth-changed'))
    }

    if (user) {
        return <AccountOverview user={user} onLogout={handleLogout} />
    }

    return (
        <div className="puma-container py-10 min-h-[500px]">
            <h1 className="font-heading text-4xl font-bold mb-8">My account</h1>

            <div className="max-w-[512px] mx-auto flex border-b border-puma-border mb-8">
                <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 pb-3 text-center cursor-pointer ${activeTab === 'login' ? 'font-bold border-b-2 border-puma-gold' : 'text-puma-gray'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab('join')}
                    className={`flex-1 pb-3 text-center cursor-pointer ${activeTab === 'join' ? 'font-bold border-b-2 border-puma-gold' : 'text-puma-gray'}`}
                >
                    Join Us
                </button>
            </div>

            {activeTab === 'login' ? <LoginForm /> : <JoinForm />}
        </div>
    )
}

export default AccountPage
