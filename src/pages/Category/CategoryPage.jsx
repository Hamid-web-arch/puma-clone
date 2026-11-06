import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { navItems } from '../../data/navMenu'
import { filterByCategoryKeyword, applyFilters, sortProducts, emptyFilters } from '../../utils/filterProducts'
import ProductCard from '../../components/ProductCard'
import FilterBar from '../../components/FilterBar'
import PageLoader from '../../components/PageLoader'

const categoryPatterns = {
  women: "\\bwomen\\b",
  men: "\\bmen\\b",
  kids: "\\bkids\\b",
  lifestyle: "sneaker",
  sport: "running|soccer|basketball|motorsport|training|jersey",
}

function CategoryPage({ slug }) {
  const { products, isLoading, error } = useProducts()
  const [filters, setFilters] = useState(emptyFilters)
  const [sortBy, setSortBy] = useState('recommended')

  const label = navItems.find((item) => item.slug === slug)?.label ?? slug
  const pattern = categoryPatterns[slug] ?? slug
  const matchedProducts = filterByCategoryKeyword(products, pattern)
  
  // Datamiz mehdud oldugu ucun her kateqoriya ucun uygun mehsul olmaya biler.
  // Bele hallarda bos sehife gostermek eveizne butun mehsullari gostururuk.
  const categoryProducts = matchedProducts.length > 0 ? matchedProducts : products

  const filteredProducts = useMemo(
    () => sortProducts(applyFilters(categoryProducts, filters), sortBy),
    [categoryProducts, filters, sortBy]
  )

  function toggleFilter(key, value) {
    setFilters((current) => {
      const values = current[key]
      const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value]
      return { ...current, [key]: next }
    })
  }

  return (
    <div className="puma-container py-10 min-h-[400px]">
      <p className="text-sm text-puma-gray mb-2">
        <Link to="/" className="hover:underline">Home</Link> / {label}
      </p>
      <h1 className="font-heading text-3xl font-extrabold uppercase tracking-wider mb-6">{label}</h1>

      {isLoading && <PageLoader />}
      {error && <p className="text-puma-red">Could not load products: {error}</p>}

      {!isLoading && !error && (
        <>
          <div className="border-y border-puma-border py-4 mb-6">
            <FilterBar
              products={categoryProducts}
              filters={filters}
              onToggle={toggleFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <p className="font-bold uppercase tracking-wide mb-6">{filteredProducts.length} Products</p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-puma-gray">No products match the selected filters.</p>
          )}
        </>
      )}
    </div>
  )
}

export default CategoryPage
