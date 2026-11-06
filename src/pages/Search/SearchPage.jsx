import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IoIosSearch, IoMdClose } from 'react-icons/io'
import { useProducts } from '../../hooks/useProducts'
import PageLoader from '../../components/PageLoader'

const trendingSearches = ['Speedcat', 'Suede', 'Ballerina', 'Palermo', 'Basketball', 'Suede XL']

function SearchResultRow({ product }) {
    return (
        <a href="#" className="flex items-center gap-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover bg-puma-gray-light shrink-0"
            />
            <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-puma-gray text-sm">{product.category}</p>
                <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
            </div>
        </a>
    )
}

function SearchPage() {
    const { products, isLoading, error } = useProducts()
    const [searchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('q') ?? '')

    const trimmedQuery = query.trim().toLowerCase()

    const suggestions = trimmedQuery
        ? [...new Set(
            products
                .filter((product) => product.name.toLowerCase().includes(trimmedQuery))
                .map((product) => product.name)
        )].slice(0, 6)
        : trendingSearches

    const results = trimmedQuery
        ? products.filter((product) =>
            product.name.toLowerCase().includes(trimmedQuery) ||
            product.category.toLowerCase().includes(trimmedQuery)
        )
        : products.slice(0, 8)

    return (
        <div>
            <div className="bg-puma-gray-light border-b border-puma-border">
                <div className="puma-container flex items-center gap-4 py-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search puma.com"
                            className="w-full bg-white border border-puma-gray pl-4 pr-12 py-3 uppercase tracking-wide outline-none placeholder:text-puma-gray"
                        />
                        <IoIosSearch size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-puma-black" />
                    </div>

                    <Link to="/" aria-label="Close search" className="cursor-pointer">
                        <IoMdClose size={28} />
                    </Link>
                </div>
            </div>

            <div className="puma-container py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 min-h-[400px]">
                <div>
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">
                        {trimmedQuery ? 'Suggestions' : 'Trending Searches'}
                    </p>
                    <ul className="space-y-3">
                        {suggestions.map((term) => (
                            <li key={term}>
                                <button
                                    onClick={() => setQuery(term)}
                                    className="text-puma-gray hover:text-puma-black transition-colors cursor-pointer text-left"
                                >
                                    {term}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">
                        {trimmedQuery ? 'Related Products' : 'Suggested Products'}
                    </p>

                    {isLoading && <PageLoader />}
                    {error && <p className="text-puma-red">Could not load products: {error}</p>}

                    {!isLoading && !error && (
                        results.length > 0 ? (
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                                {results.map((product) => (
                                    <SearchResultRow key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-puma-gray">No products found for "{query}".</p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
