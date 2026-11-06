export const locations = [
    { country: 'United States', code: 'us', languages: ['English', 'Español'] },
    { country: 'Algeria', code: 'dz', languages: ['English', 'Français', 'العربية'] },
    { country: 'Argentina', code: 'ar', languages: ['Spanish'] },
    { country: 'Australia', code: 'au', languages: ['English'] },
    { country: 'Austria', code: 'at', languages: ['Deutsch'] },
    { country: 'Belgium', code: 'be', languages: ['Français', 'Nederlands'] },
    { country: 'Brazil', code: 'br', languages: ['Português'] },
    { country: 'Bulgaria', code: 'bg', languages: ['English'] },
    { country: 'Canada', code: 'ca', languages: ['English', 'Français'] },
    { country: 'Chile', code: 'cl', languages: ['Español'] },
    { country: 'Germany', code: 'de', languages: ['Deutsch'] },
    { country: 'Spain', code: 'es', languages: ['Español'] },
    { country: 'France', code: 'fr', languages: ['Français'] },
    { country: 'Italy', code: 'it', languages: ['Italiano'] },
    { country: 'United Kingdom', code: 'gb', languages: ['English'] },
]

export function flagUrl(code) {
    return `https://flagcdn.com/w40/${code}.png`
}
