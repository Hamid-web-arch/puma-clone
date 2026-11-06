import { useState } from 'react'
import { getUserByEmail, createUser, updateUser } from '../api/client'

export function useAuth() {
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function login(email, password) {
        setError('')
        setIsSubmitting(true)
        try {
            const users = await getUserByEmail(email)
            const user = users.find((u) => u.password === password)

            if (!user) {
                setError('Email or password is incorrect.')
                return null
            }

            localStorage.setItem('puma_user', JSON.stringify(user))
            window.dispatchEvent(new Event('auth-changed'))
            return user
        } finally {
            setIsSubmitting(false)
        }
    }

    async function register({ firstName, lastName, email, password, joinMailingList }) {
        setError('')
        setIsSubmitting(true)
        try {
            const existingUsers = await getUserByEmail(email)

            if (existingUsers.length > 0) {
                setError('An account with this email already exists.')
                return null
            }

            const user = await createUser({ firstName, lastName, email, password, joinMailingList })
            localStorage.setItem('puma_user', JSON.stringify(user))
            window.dispatchEvent(new Event('auth-changed'))
            return user
        } finally {
            setIsSubmitting(false)
        }
    }

    async function updateProfile(userId, updates) {
        setError('')
        setIsSubmitting(true)
        try {
            const user = await updateUser(userId, updates)
            localStorage.setItem('puma_user', JSON.stringify(user))
            window.dispatchEvent(new Event('auth-changed'))
            return user
        } finally {
            setIsSubmitting(false)
        }
    }

    return { login, register, updateProfile, error, isSubmitting }
}
