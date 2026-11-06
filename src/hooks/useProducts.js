import { useEffect, useState } from 'react'
import { getProducts } from '../api/client'

export function useProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isCancelled = false

        setIsLoading(true)
        setError(null)

        getProducts()
            .then((data) => {
                if (!isCancelled) setProducts(data)
            })
            .catch((err) => {
                if (!isCancelled) setError(err.message)
            })
            .finally(() => {
                if (!isCancelled) setIsLoading(false)
            })

        return () => {
            isCancelled = true
        }
    }, [])

    return { products, isLoading, error }
}
