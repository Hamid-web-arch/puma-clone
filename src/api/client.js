export const API_BASE_URL = 'http://localhost:3001'

async function request(path, options) {
    const response = await fetch(`${API_BASE_URL}${path}`, options)

    if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`)
    }

    return response.json()
}

export function getProducts() {
    return request('/products')
}

export function getProduct(id) {
    return request(`/products/${id}`)
}

export function getUserByEmail(email) {
    return request(`/users?email=${encodeURIComponent(email)}`)
}

export function createUser(user) {
    return request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
}

export function updateUser(id, updates) {
    return request(`/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    })
}
