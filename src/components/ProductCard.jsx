import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { useWishlist } from '../hooks/useWishlist'

function ProductCard({ product }) {
    const { isWishlisted, toggle } = useWishlist()
    const wishlisted = isWishlisted(product.id)

    function handleWishlistClick(e) {
        e.preventDefault()
        toggle(product.id)
    }

    return (
        <Link to={`/product/${product.id}`} className="block relative">
            <button
                onClick={handleWishlistClick}
                aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center bg-white/90 rounded-full cursor-pointer z-10"
            >
                {wishlisted ? <IoIosHeart size={18} className="text-puma-black" /> : <IoIosHeartEmpty size={18} />}
            </button>

            <img
                src={product.image}
                alt={`${product.name} ${product.category}`}
                draggable={false}
                className="w-full aspect-square object-cover bg-puma-gray-light select-none"
            />
            <div className="mt-2">
                {product.colorsCount > 1 && (
                    <p className="text-puma-gray text-xs mb-1">
                        {product.colorsCount} Colors
                    </p>
                )}
                <div className="flex justify-between items-start">
                    <p className="font-bold">{product.name}</p>
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                </div>
                <p className="text-puma-gray text-sm">{product.category}</p>
                {product.badge && (
                    <span className={`inline-block mt-2 text-white text-xs font-bold uppercase px-2 py-1 ${product.badge.toLowerCase() === 'new' ? 'bg-puma-black' : 'bg-blue-600'}`}>
                        {product.badge}
                    </span>
                )}
            </div>
        </Link>
    )
}

export default ProductCard
