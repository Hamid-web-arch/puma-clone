import React, { useState } from 'react'
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import AccountLayout from '../../components/AccountLayout'
import { FieldLabel, SubmitButton, ErrorText } from '../../components/AccountFormFields'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuth } from '../../hooks/useAuth'

const brandIcons = {
    Visa: <FaCcVisa size={28} className="text-[#1a1f71]" />,
    Mastercard: <FaCcMastercard size={28} className="text-[#eb001b]" />,
    Amex: <FaCcAmex size={28} className="text-[#2e77bc]" />,
}

function detectBrand(cardNumber) {
    if (cardNumber.startsWith('4')) return 'Visa'
    if (cardNumber.startsWith('5')) return 'Mastercard'
    if (cardNumber.startsWith('3')) return 'Amex'
    return 'Card'
}

function CardTile({ card, onRemove }) {
    return (
        <div className="border border-puma-border p-6 relative flex items-center gap-4">
            <button
                onClick={() => onRemove(card.id)}
                aria-label="Remove card"
                className="absolute top-4 right-4 text-puma-gray hover:text-puma-black cursor-pointer"
            >
                <IoMdClose size={20} />
            </button>
            {brandIcons[card.brand] ?? null}
            <div>
                <p className="font-bold">&bull;&bull;&bull;&bull; {card.last4}</p>
                <p className="text-puma-gray text-sm">{card.cardholderName}</p>
                <p className="text-puma-gray text-sm">Expires {card.expiry}</p>
            </div>
        </div>
    )
}

function AddCardForm({ onSave, onCancel, isSubmitting, error }) {
    const [cardholderName, setCardholderName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')

    const digitsOnly = cardNumber.replace(/\D/g, '')
    const isDisabled = !cardholderName.trim() || digitsOnly.length < 12 || !expiry.trim()

    function handleSubmit(e) {
        e.preventDefault()
        onSave({
            cardholderName,
            last4: digitsOnly.slice(-4),
            brand: detectBrand(digitsOnly),
            expiry,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="border border-puma-border p-6 max-w-md flex flex-col gap-4">
            <div>
                <FieldLabel>Cardholder Name</FieldLabel>
                <input value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} className="w-full border border-puma-border px-4 py-3 outline-none" />
            </div>

            <div>
                <FieldLabel>Card Number</FieldLabel>
                <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-puma-border px-4 py-3 outline-none"
                />
            </div>

            <div className="max-w-[160px]">
                <FieldLabel>Expiry (MM/YY)</FieldLabel>
                <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="08/28"
                    className="w-full border border-puma-border px-4 py-3 outline-none"
                />
            </div>

            <ErrorText>{error}</ErrorText>

            <div className="flex gap-3">
                <SubmitButton disabled={isDisabled || isSubmitting}>Save Card</SubmitButton>
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

function AccountCardsPage() {
    const user = useCurrentUser()
    const { updateProfile, error, isSubmitting } = useAuth()
    const [isAdding, setIsAdding] = useState(false)

    const cards = user?.cards ?? []

    async function handleSave(card) {
        const next = [...cards, { ...card, id: Date.now() }]
        const updated = await updateProfile(user.id, { cards: next })
        if (updated) setIsAdding(false)
    }

    async function handleRemove(cardId) {
        const next = cards.filter((card) => card.id !== cardId)
        await updateProfile(user.id, { cards: next })
    }

    return (
        <AccountLayout active="Cards">
            {user && (
                <>
                    <h1 className="font-heading text-3xl font-bold mb-6">Cards</h1>

                    {cards.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            {cards.map((card) => (
                                <CardTile key={card.id} card={card} onRemove={handleRemove} />
                            ))}
                        </div>
                    ) : (
                        <p className="font-bold mb-6">Payment method is not saved</p>
                    )}

                    {isAdding ? (
                        <AddCardForm
                            onSave={handleSave}
                            onCancel={() => setIsAdding(false)}
                            isSubmitting={isSubmitting}
                            error={error}
                        />
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full max-w-md flex items-center justify-center bg-puma-gray-light py-14 text-2xl cursor-pointer"
                        >
                            +
                        </button>
                    )}

                    <div className="flex items-center gap-3 mt-6">
                        <span className="text-sm font-bold">We Accept:</span>
                        <div className="flex items-center gap-2">
                            <FaCcVisa size={32} className="text-[#1a1f71]" />
                            <FaCcMastercard size={32} className="text-[#eb001b]" />
                            <FaCcAmex size={32} className="text-[#2e77bc]" />
                        </div>
                    </div>
                </>
            )}
        </AccountLayout>
    )
}

export default AccountCardsPage
