import React, { useState } from 'react'
import { HiOutlinePencil } from 'react-icons/hi2'
import AccountLayout from '../../components/AccountLayout'
import { FieldLabel, PasswordField, SubmitButton, ErrorText } from '../../components/AccountFormFields'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuth } from '../../hooks/useAuth'

function SettingsCard({ title, isEditing, onEdit, children }) {
    return (
        <div className="border border-puma-border p-6 mb-6 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold">{title}</h2>
                {!isEditing && (
                    <button onClick={onEdit} aria-label={`Edit ${title}`} className="cursor-pointer">
                        <HiOutlinePencil size={20} className="text-puma-gray" />
                    </button>
                )}
            </div>
            {children}
        </div>
    )
}

function PersonalDetailsCard({ user }) {
    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const { updateProfile, error, isSubmitting } = useAuth()

    function startEditing() {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setIsEditing(true)
    }

    async function handleSave(e) {
        e.preventDefault()
        const updated = await updateProfile(user.id, { firstName, lastName })
        if (updated) setIsEditing(false)
    }

    if (!isEditing) {
        return (
            <SettingsCard title="Personal Details" isEditing={isEditing} onEdit={startEditing}>
                <p><span className="font-bold">First Name</span>: {user.firstName}</p>
                <p><span className="font-bold">Last Name</span>: {user.lastName}</p>
            </SettingsCard>
        )
    }

    return (
        <SettingsCard title="Personal Details" isEditing={isEditing}>
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-sm">
                <div>
                    <FieldLabel>First Name</FieldLabel>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-puma-border px-4 py-3 outline-none"
                    />
                </div>
                <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-puma-border px-4 py-3 outline-none"
                    />
                </div>

                <ErrorText>{error}</ErrorText>

                <div className="flex gap-3">
                    <SubmitButton disabled={!firstName.trim() || !lastName.trim() || isSubmitting}>Save</SubmitButton>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 h-12 border border-puma-border font-bold uppercase cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </SettingsCard>
    )
}

function EmailPasswordCard({ user }) {
    const [isEditing, setIsEditing] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const { updateProfile, error, isSubmitting } = useAuth()

    function startEditing() {
        setEmail(user.email)
        setPassword('')
        setIsEditing(true)
    }

    async function handleSave(e) {
        e.preventDefault()
        const updates = { email }
        if (password.trim()) updates.password = password
        const updated = await updateProfile(user.id, updates)
        if (updated) setIsEditing(false)
    }

    if (!isEditing) {
        return (
            <SettingsCard title="Email & Password" isEditing={isEditing} onEdit={startEditing}>
                <p className="mb-2"><span className="font-bold">Email</span>: {user.email}</p>
                <p><span className="font-bold">Password</span>: &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>
            </SettingsCard>
        )
    }

    return (
        <SettingsCard title="Email & Password" isEditing={isEditing}>
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-sm">
                <div>
                    <FieldLabel>Email</FieldLabel>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-puma-border px-4 py-3 outline-none"
                    />
                </div>
                <div>
                    <FieldLabel>New Password (leave blank to keep current)</FieldLabel>
                    <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <ErrorText>{error}</ErrorText>

                <div className="flex gap-3">
                    <SubmitButton disabled={!email.trim() || isSubmitting}>Save</SubmitButton>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 h-12 border border-puma-border font-bold uppercase cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </SettingsCard>
    )
}

function EmailNotificationsCard({ user }) {
    const [isEditing, setIsEditing] = useState(false)
    const [joinMailingList, setJoinMailingList] = useState(Boolean(user.joinMailingList))
    const { updateProfile, error, isSubmitting } = useAuth()

    function startEditing() {
        setJoinMailingList(Boolean(user.joinMailingList))
        setIsEditing(true)
    }

    async function handleSave(e) {
        e.preventDefault()
        const updated = await updateProfile(user.id, { joinMailingList })
        if (updated) setIsEditing(false)
    }

    if (!isEditing) {
        return (
            <SettingsCard title="Email Notifications" isEditing={isEditing} onEdit={startEditing}>
                <p>
                    {user.joinMailingList
                        ? "Yes, I'd like to receive promotional emails from PUMA."
                        : "No, I'd prefer not to receive promotional emails from PUMA at this time."}
                </p>
            </SettingsCard>
        )
    }

    return (
        <SettingsCard title="Email Notifications" isEditing={isEditing}>
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={joinMailingList}
                        onChange={(e) => setJoinMailingList(e.target.checked)}
                        className="w-4 h-4"
                    />
                    I'd like to receive promotional emails from PUMA.
                </label>

                <ErrorText>{error}</ErrorText>

                <div className="flex gap-3">
                    <SubmitButton disabled={isSubmitting}>Save</SubmitButton>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 h-12 border border-puma-border font-bold uppercase cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </SettingsCard>
    )
}

function AccountSettingsPage() {
    const user = useCurrentUser()

    return (
        <AccountLayout active="Account Settings">
            {user && (
                <>
                    <h1 className="font-heading text-3xl font-bold mb-6">Account Settings</h1>

                    <PersonalDetailsCard user={user} />
                    <EmailPasswordCard user={user} />
                    <EmailNotificationsCard user={user} />
                </>
            )}
        </AccountLayout>
    )
}

export default AccountSettingsPage
