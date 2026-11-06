import React from 'react'
import AccountLayout from '../../components/AccountLayout'
import ProductCard from '../../components/ProductCard'
import PageLoader from '../../components/PageLoader'
import { useProducts } from '../../hooks/useProducts'
import { useWishlist } from '../../hooks/useWishlist'

function WishlistPage() {
    const { products, isLoading, error } = useProducts()
    const { productIds } = useWishlist()

    const wishlistProducts = products.filter((product) => productIds.includes(product.id))

    return (
        <AccountLayout active="Wishlist" requireAuth={false}>
            <div className="flex items-center justify-between border-b border-puma-border pb-4 mb-10">
                <h1 className="font-heading text-2xl font-bold uppercase">My Wishlist</h1>
                <span className="text-puma-gray">{wishlistProducts.length} items</span>
            </div>

            {isLoading && <PageLoader />}
            {error && <p className="text-puma-red">Could not load wishlist: {error}</p>}

            {!isLoading && !error && (
                wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center py-10">
                        <img src="/heart.svg" alt="" className="w-24 h-24 opacity-20" />
                        <p className="font-heading text-2xl font-bold mt-6">Your Wishlist is Empty</p>
                    </div>
                )
            )}
        </AccountLayout>
    )
}

export default WishlistPage
