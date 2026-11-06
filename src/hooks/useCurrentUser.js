import { useEffect, useState } from 'react'

function readUser() {
    try {
        const raw = localStorage.getItem('puma_user')
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function useCurrentUser() {
    const [user, setUser] = useState(readUser)

    useEffect(() => {
        function handleAuthChange() {
            setUser(readUser())
        }
        window.addEventListener('auth-changed', handleAuthChange)
        return () => window.removeEventListener('auth-changed', handleAuthChange)
    }, [])

    return user
}
