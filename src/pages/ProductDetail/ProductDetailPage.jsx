import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiOutlineArrowPath, HiOutlineHeart, HiHeart } from 'react-icons/hi2'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'
import { MdStraighten } from 'react-icons/md'
import { useProduct } from '../../hooks/useProduct'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import ProductCarousel from '../../components/ProductCarousel'
import SizeGuideModal from '../../components/SizeGuideModal'
import PageLoader from '../../components/PageLoader'

const sizes = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']

function ProductBadge({ badge }) {
    const isNew = badge.toLowerCase() === 'new'
    const colorClass = isNew ? 'bg-puma-black' : 'bg-blue-600'

    return (
        <span className={`inline-block ${colorClass} text-white text-xs font-bold uppercase px-3 py-1 mb-3`}>
            {badge}
        </span>
    )
}

// Her mehsul ucun sabit (id-e bagli) reytinq - real rey datamiz olmadigi ucun
// hemise eyni qalan sade bir deyer verir, her render-de teseduf olmur.
function getRating(id) {
    const rating = 4 + ((id * 7) % 10) / 10
    const reviewCount = ((id * 13) % 40) + 3
    return { rating, reviewCount }
}

function StarRating({ id }) {
    const { rating, reviewCount } = getRating(id)
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5

    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="flex text-puma-black">
                {Array.from({ length: 5 }).map((_, index) => {
                    if (index < fullStars) return <IoIosStar key={index} />
                    if (index === fullStars && hasHalfStar) return <IoIosStarHalf key={index} />
                    return <IoIosStarOutline key={index} />
                })}
            </div>
            <a href="#" className="text-sm underline">Read {reviewCount} Reviews</a>
        </div>
    )
}

function ProductDetailPage() {
    const { id } = useParams()
    const { product, isLoading, error } = useProduct(id)
    const { products: allProducts } = useProducts()
    const { addItem } = useCart()
    const { isWishlisted, toggle: toggleWishlist } = useWishlist()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState(null)
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
    const [sizeError, setSizeError] = useState(false)

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <p className="puma-container py-16 text-center text-puma-red">Could not load product: {error}</p>
    }

    if (!product) return null

    const relatedProducts = allProducts.filter(
        (item) => item.category === product.category && item.id !== product.id
    )

    const colorVariants = allProducts.filter((item) => item.styleId === product.styleId)

    function handleAddToCart() {
        if (!selectedSize) {
            setSizeError(true)
            return
        }
        setSizeError(false)
        addItem(product.id, selectedSize, 1)
        navigate('/cart')
    }

    return (
        <div className="py-8 min-h-[500px]">
            <div className="puma-container">
                <nav className="text-sm mb-6">
                    <Link to="/" className="font-bold hover:underline">Home</Link>
                    <span className="mx-2 text-puma-gray">•</span>
                    <span className="text-puma-gray">{product.name}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-10">
                    <img
                        src={product.image}
                        alt={`${product.name} ${product.category}`}
                        className="w-full aspect-square object-cover bg-puma-gray-light"
                    />

                    <div>
                        <h1 className="font-heading text-3xl font-bold">{product.name}</h1>
                        <p className="text-puma-gray mb-3">{product.category}</p>

                        <StarRating id={product.id} />

                        {product.badge && <ProductBadge badge={product.badge} />}

                        <p className="text-2xl font-bold mb-1">${product.price.toFixed(2)}</p>
                        <p className="text-puma-gray text-sm mb-6">
                            Or 4 payments of ${(product.price / 4).toFixed(2)} by Afterpay or Klarna
                        </p>

                        <p className="text-sm font-bold uppercase mb-2">
                            Color: <span className="font-normal normal-case">{product.color}</span>
                        </p>

                        {colorVariants.length > 1 ? (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {colorVariants.map((variant) => (
                                    <Link
                                        key={variant.id}
                                        to={`/product/${variant.id}`}
                                        className={`w-14 h-14 border-2 p-1 ${
                                            variant.id === product.id ? 'border-puma-black' : 'border-puma-border'
                                        }`}
                                    >
                                        <img src={variant.image} alt={variant.color} className="w-full h-full object-cover" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            product.colorsCount > 1 && (
                                <p className="text-puma-gray text-sm mb-6">{product.colorsCount} Colors</p>
                            )
                        )}

                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold uppercase">Size</p>
                            <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="flex items-center gap-1 text-sm font-bold underline cursor-pointer"
                            >
                                <MdStraighten size={16} />
                                Size Guide
                            </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6 max-w-[420px]">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(size)
                                        setSizeError(false)
                                    }}
                                    className={`border py-2 text-sm transition-colors cursor-pointer ${
                                        selectedSize === size
                                            ? 'border-puma-black bg-puma-black text-white'
                                            : 'border-puma-border hover:border-puma-black'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {sizeError && (
                            <p className="text-puma-red text-sm mb-3">Please select a size.</p>
                        )}

                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                aria-label={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                className="w-12 h-12 shrink-0 border border-puma-border flex items-center justify-center cursor-pointer hover:border-puma-black transition-colors"
                            >
                                {isWishlisted(product.id) ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />}
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-12 bg-puma-black text-white font-bold uppercase cursor-pointer"
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p className="flex items-center gap-2 text-sm text-puma-gray">
                            <HiOutlineArrowPath size={18} />
                            Free returns on all qualifying orders.
                        </p>
                    </div>
                </div>

                {product.description && (
                    <div className="max-w-[700px] mt-10">
                        <h2 className="font-heading text-lg font-bold mb-2">Description</h2>
                        <p className="text-puma-gray">{product.description}</p>
                    </div>
                )}
            </div>

            {relatedProducts.length > 0 && (
                <ProductCarousel title="You May Also Like" products={relatedProducts} />
            )}

            {isSizeGuideOpen && <SizeGuideModal onClose={() => setIsSizeGuideOpen(false)} />}
        </div>
    )
}

export default ProductDetailPage
