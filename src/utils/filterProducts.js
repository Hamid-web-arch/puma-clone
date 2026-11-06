export function filterByCategoryKeyword(products, pattern) {
  const regex = new RegExp(pattern, 'i')
  return products.filter((product) => regex.test(product.category))
}

export function getPrimaryColor(product) {
  return product.color.split('-')[0].trim()
}

export const priceBuckets = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $150', min: 100, max: 150 },
  { label: '$150 - $200', min: 150, max: 200 },
  { label: '$200 & Above', min: 200, max: Infinity },
]

function isInPriceBucket(price, bucketLabel) {
  const bucket = priceBuckets.find((b) => b.label === bucketLabel)
  return bucket ? price >= bucket.min && price < bucket.max : false
}

export const emptyFilters = {
  category: [],
  style: [],
  color: [],
  price: [],
  sport: [],
  fit: [],
}

export function applyFilters(products, filters) {
  return products.filter((product) => {
    if (filters.category.length && !filters.category.includes(product.style)) return false
    if (filters.style.length && !filters.style.includes(product.category)) return false
    if (filters.sport.length && !filters.sport.includes(product.sport)) return false
    if (filters.fit.length && !filters.fit.includes(product.fit)) return false
    if (filters.color.length && !filters.color.includes(getPrimaryColor(product))) return false
    if (filters.price.length && !filters.price.some((bucket) => isInPriceBucket(product.price, bucket))) return false
    return true
  })
}

export function sortProducts(products, sortBy) {
  const sorted = [...products]
  if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (sortBy === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name))
  return sorted
}
