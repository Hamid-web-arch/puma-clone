import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import AccountLayout from '../../components/AccountLayout'
import { FieldLabel, SubmitButton, ErrorText } from '../../components/AccountFormFields'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuth } from '../../hooks/useAuth'

function AddressCard({ address, onRemove }) {
    return (
        <div className="border border-puma-border p-6 relative">
            <button
                onClick={() => onRemove(address.id)}
                aria-label="Remove address"
                className="absolute top-4 right-4 text-puma-gray hover:text-puma-black cursor-pointer"
            >
                <IoMdClose size={20} />
            </button>
            <p className="font-bold">{address.firstName} {address.lastName}</p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state} {address.zip}</p>
            <p className="text-puma-gray mt-1">{address.phone}</p>
        </div>
    )
}

function AddAddressForm({ onSave, onCancel, isSubmitting, error }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')

    const isDisabled = !firstName.trim() || !lastName.trim() || !street.trim() || !city.trim() || !state.trim() || !zip.trim()

    function handleSubmit(e) {
        e.preventDefault()
        onSave({ firstName, lastName, street, city, state, zip, phone })
    }

    return (
        <form onSubmit={handleSubmit} className="border border-puma-border p-6 max-w-md flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>First Name</FieldLabel>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
                </div>
                <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
                </div>
            </div>

            <div>
                <FieldLabel>Street Address</FieldLabel>
                <input value={street} onChange={(e) => setStreet(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <FieldLabel>City</FieldLabel>
                    <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
                </div>
                <div>
                    <FieldLabel>State</FieldLabel>
                    <input value={state} onChange={(e) => setState(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
                </div>
                <div>
                    <FieldLabel>ZIP</FieldLabel>
                    <input value={zip} onChange={(e) => setZip(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
                </div>
            </div>

            <div>
                <p className="text-sm font-bold uppercase tracking-wide mb-2">Phone</p>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
            </div>

            <ErrorText>{error}</ErrorText>

            <div className="flex gap-3">
                <SubmitButton disabled={isDisabled || isSubmitting}>Save Address</SubmitButton>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 h-12 border border-puma-border font-bold uppercase cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

function AccountAddressesPage() {
    const user = useCurrentUser()
    const { updateProfile, error, isSubmitting } = useAuth()
    const [isAdding, setIsAdding] = useState(false)

    const addresses = user?.addresses ?? []

    async function handleSave(address) {
        const next = [...addresses, { ...address, id: Date.now() }]
        const updated = await updateProfile(user.id, { addresses: next })
        if (updated) setIsAdding(false)
    }

    async function handleRemove(addressId) {
        const next = addresses.filter((address) => address.id !== addressId)
        await updateProfile(user.id, { addresses: next })
    }

    return (
        <AccountLayout active="Addresses">
            {user && (
                <>
                    <h1 className="font-heading text-3xl font-bold mb-6">Addresses</h1>

                    {addresses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            {addresses.map((address) => (
                                <AddressCard key={address.id} address={address} onRemove={handleRemove} />
                            ))}
                        </div>
                    ) : (
                        <p className="font-bold mb-6">You have no addresses yet</p>
                    )}

                    {isAdding ? (
                        <AddAddressForm
                            onSave={handleSave}
                            onCancel={() => setIsAdding(false)}
                            isSubmitting={isSubmitting}
                            error={error}
                        />
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full max-w-md flex flex-col items-center justify-center gap-2 bg-puma-gray-light py-14 text-2xl cursor-pointer"
                        >
                            <span>+</span>
                            <span className="text-sm font-bold underline">Add New Address</span>
                        </button>
                    )}
                </>
            )}
        </AccountLayout>
    )
}

export default AccountAddressesPage
