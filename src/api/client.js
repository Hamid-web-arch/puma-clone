// Backend-siz "API": məhsullar db.json-dan statik oxunur,
// istifadəçilər isə brauzerin localStorage-ında saxlanır.
// Bu sayədə layihə GitHub Pages kimi statik hostinqdə işləyir.
import db from '../../db.json'

const USERS_KEY = 'puma_users'

function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY)
        if (raw) return JSON.parse(raw)
    } catch {
        // localStorage əlçatan deyilsə, seed istifadəçilərə qayıdırıq
    }
    return structuredClone(db.users)
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function clone(value) {
    return structuredClone(value)
}

export async function getProducts() {
    return clone(db.products)
}

export async function getProduct(id) {
    const product = db.products.find((p) => String(p.id) === String(id))
    if (!product) {
        throw new Error('API error 404: Not Found')
    }
    return clone(product)
}

export async function getUserByEmail(email) {
    return readUsers().filter((u) => u.email === email)
}

export async function createUser(user) {
    const users = readUsers()
    const nextId = users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1
    const created = { ...user, id: nextId }
    writeUsers([...users, created])
    return created
}

export async function updateUser(id, updates) {
    const users = readUsers()
    const index = users.findIndex((u) => String(u.id) === String(id))
    if (index === -1) {
        throw new Error('API error 404: Not Found')
    }
    const updated = { ...users[index], ...updates }
    users[index] = updated
    writeUsers(users)
    return updated
}
