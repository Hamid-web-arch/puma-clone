import { useEffect, useState } from 'react'
import { getProduct } from '../api/client'

export function useProduct(id) {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isCancelled = false

        setIsLoading(true)
        setError(null)

        getProduct(id)
            .then((data) => {
                if (!isCancelled) setProduct(data)
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
    }, [id])

    return { product, isLoading, error }
}
