import { useEffect, useState } from 'react'

function readCart() {
    try {
        const raw = localStorage.getItem('puma_cart')
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function writeCart(items) {
    localStorage.setItem('puma_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cart-changed'))
}

export function useCart() {
    const [items, setItems] = useState(readCart)

    useEffect(() => {
        function handleCartChange() {
            setItems(readCart())
        }
        window.addEventListener('cart-changed', handleCartChange)
        return () => window.removeEventListener('cart-changed', handleCartChange)
    }, [])

    function addItem(productId, size, quantity = 1) {
        const current = readCart()
        const existing = current.find((item) => item.productId === productId && item.size === size)

        const next = existing
            ? current.map((item) =>
                item === existing ? { ...item, quantity: item.quantity + quantity } : item
            )
            : [...current, { productId, size, quantity }]

        writeCart(next)
    }

    function updateQuantity(productId, size, quantity) {
        const current = readCart()
        const next = quantity < 1
            ? current.filter((item) => !(item.productId === productId && item.size === size))
            : current.map((item) =>
                item.productId === productId && item.size === size ? { ...item, quantity } : item
            )

        writeCart(next)
    }

    function removeItem(productId, size) {
        updateQuantity(productId, size, 0)
    }

    const itemCount = items.reduce((total, item) => total + item.quantity, 0)

    return { items, addItem, updateQuantity, removeItem, itemCount }
}
