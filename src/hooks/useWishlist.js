import { useEffect, useState } from 'react'

function readWishlist() {
    try {
        const raw = localStorage.getItem('puma_wishlist')
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function writeWishlist(productIds) {
    localStorage.setItem('puma_wishlist', JSON.stringify(productIds))
    window.dispatchEvent(new Event('wishlist-changed'))
}

export function useWishlist() {
    const [productIds, setProductIds] = useState(readWishlist)

    useEffect(() => {
        function handleWishlistChange() {
            setProductIds(readWishlist())
        }
        window.addEventListener('wishlist-changed', handleWishlistChange)
        return () => window.removeEventListener('wishlist-changed', handleWishlistChange)
    }, [])

    function isWishlisted(productId) {
        return productIds.includes(productId)
    }

    function toggle(productId) {
        const current = readWishlist()
        const next = current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId]

        writeWishlist(next)
    }

    return { productIds, isWishlisted, toggle, itemCount: productIds.length }
}
