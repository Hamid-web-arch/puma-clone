import React from 'react'
import { Navigate } from 'react-router-dom'
import AccountSidebar from './AccountSidebar'
import { useCurrentUser } from '../hooks/useCurrentUser'

function AccountLayout({ active, children, requireAuth = true }) {
    const user = useCurrentUser()

    if (requireAuth && !user) {
        return <Navigate to="/account" replace />
    }

    function handleLogout() {
        localStorage.removeItem('puma_user')
        window.dispatchEvent(new Event('auth-changed'))
    }

    return (
        <div className="puma-container py-10 flex flex-col md:flex-row gap-12">
            <AccountSidebar active={active} user={user} onLogout={handleLogout} />
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    )
}

export default AccountLayout
