import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import ProductCarousel from '../../components/ProductCarousel'
import PageLoader from '../../components/PageLoader'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'

function CartLine({ item, product, onUpdateQuantity, onRemove }) {
    return (
        <div className="flex gap-4 py-6 border-b border-puma-border">
            <Link to={`/product/${product.id}`} className="shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover bg-puma-gray-light"
                />
            </Link>

            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <Link to={`/product/${product.id}`} className="font-bold hover:underline">
                            {product.name}
                        </Link>
                        <p className="text-puma-gray text-sm">{product.category}</p>
                        <p className="text-puma-gray text-sm">Size: {item.size}</p>
                    </div>

                    <button
                        onClick={() => onRemove(item.productId, item.size)}
                        aria-label="Remove item"
                        className="text-puma-gray hover:text-puma-black cursor-pointer"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-puma-border">
                        <button
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="w-8 h-8 cursor-pointer"
                        >
                            −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="w-8 h-8 cursor-pointer"
                        >
                            +
                        </button>
                    </div>

                    <p className="font-bold">${(product.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

function CartPage() {
    const { products, isLoading, error } = useProducts()
    const { items, updateQuantity, removeItem } = useCart()

    const cartLines = items
        .map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
        .filter((line) => line.product)

    const subtotal = cartLines.reduce((total, { item, product }) => total + product.price * item.quantity, 0)

    if (isLoading) return <PageLoader />
    if (error) return <p className="puma-container py-16 text-center text-puma-red">Could not load cart: {error}</p>

    if (cartLines.length === 0) {
        return (
            <div>
                <div className="puma-container py-24 flex flex-col items-center text-center">
                    <HiOutlineShoppingCart size={96} className="text-puma-border mb-6" />
                    <p className="font-heading text-xl font-bold">Your Shopping Cart is Empty</p>
                </div>

                <ProductCarousel title="Recommended For You" products={products} />
            </div>
        )
    }

    return (
        <div>
            <div className="puma-container py-10 grid md:grid-cols-[1fr_360px] gap-10">
                <div>
                    <h1 className="font-heading text-2xl font-bold uppercase mb-6">
                        Shopping Cart ({cartLines.length})
                    </h1>

                    {cartLines.map(({ item, product }) => (
                        <CartLine
                            key={`${item.productId}-${item.size}`}
                            item={item}
                            product={product}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                        />
                    ))}
                </div>

                <div className="border border-puma-border p-6 h-fit">
                    <h2 className="font-heading text-lg font-bold mb-4">Order Summary</h2>

                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-puma-gray">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-puma-gray">Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="flex justify-between font-bold border-t border-puma-border pt-4 mb-6">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <button className="w-full h-12 bg-puma-black text-white font-bold uppercase cursor-pointer">
                        Checkout
                    </button>
                </div>
            </div>

            <ProductCarousel title="Recommended For You" products={products} />
        </div>
    )
}

export default CartPage
