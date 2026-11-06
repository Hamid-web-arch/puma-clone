import React from 'react'
import Hero from './Hero'
import ProductCarousel from '../../components/ProductCarousel'
import PromoCardGrid from '../../components/PromoCardGrid'
import PageLoader from '../../components/PageLoader'
import { useProducts } from '../../hooks/useProducts'
import { newAndFeatured, lifestyleFavorites } from '../../data/homePromos'

function Home() {
  const { products, isLoading, error } = useProducts()

  const sneakerProducts = products.filter(product =>
    product.category.toLowerCase().includes('sneaker')
  )

  return (
    <div>
      <Hero />

      {isLoading && <PageLoader />}

      {error && (
        <p className="puma-container py-16 text-center text-puma-red">
          Could not load products: {error}
        </p>
      )}

      {!isLoading && !error && <ProductCarousel products={sneakerProducts} />}

      <PromoCardGrid title="New & Featured" columns={2} cards={newAndFeatured} />
      <PromoCardGrid title="Lifestyle Favorites" columns={3} cards={lifestyleFavorites} />
    </div>
  )
}

export default Home
