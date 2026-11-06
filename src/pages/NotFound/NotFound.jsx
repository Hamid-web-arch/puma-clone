import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'
import ProductCarousel from '../../components/ProductCarousel'
import PageLoader from '../../components/PageLoader'
import NeedAssistance from '../../components/NeedAssistance'
import { useProducts } from '../../hooks/useProducts'

function NotFound() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const { products, isLoading, error } = useProducts()

    function handleSubmit(e) {
        e.preventDefault()
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <div className="puma-container py-16">
            <h1 className="font-heading text-3xl font-bold mb-8">
                Sorry, we couldn't find what you are looking for.
            </h1>

            <form onSubmit={handleSubmit} className="relative max-w-xl mb-16">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search PUMA.com"
                    className="w-full border border-puma-border px-4 py-3 pr-12 outline-none placeholder:text-puma-gray"
                />
                <button type="submit" aria-label="Search" className="absolute right-4 top-1/2 -translate-y-1/2 text-puma-gray cursor-pointer">
                    <IoIosSearch size={20} />
                </button>
            </form>

            {isLoading && <PageLoader />}
            {error && <p className="text-puma-red">Could not load products: {error}</p>}
            {!isLoading && !error && (
                <ProductCarousel
                    title="Products Trending Now"
                    products={products}
                    className="relative product-carousel"
                />
            )}

            <NeedAssistance />
        </div>
    )
}

export default NotFound
