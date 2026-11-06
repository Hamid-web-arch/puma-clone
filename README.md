# PUMA Store Clone

An e-commerce front end inspired by the PUMA online store, built with **React 19**, **Vite** and **Tailwind CSS**. This is my final project for my web development course.

> **Disclaimer:** This is an educational project. It is not affiliated with, endorsed by, or connected to PUMA SE. All trademarks, logos, product names and images belong to their respective owners.

## Features

- **Home page** with a hero section, promo cards and product carousels (Swiper)
- **Category pages** with filters for style (Shoes / Clothing) and sport (Lifestyle, Running, Soccer, Basketball)
- **Product search**
- **Product detail page** with a size guide modal
- **Shopping cart** and **wishlist**, saved in `localStorage`
- **User accounts**: sign up, log in, and an account area with orders, addresses, saved cards and settings
- **Extra pages**: Returns, Contact Us and a 404 page
- Region/location selector modal
- Lazy-loaded routes with a page loader
- Responsive layout

## Tech Stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS 4, React Icons |
| Sliders | Swiper |
| Build tool | Vite |
| Mock backend | json-server (`db.json`) |
| Linting | Oxlint |

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/Hamid-web-arch/<repo-name>.git
cd <repo-name>
npm install
```

### Running the app

Start the front end and the mock API together:

```bash
npm run dev:full
```

- Front end: http://localhost:5173
- API (json-server): http://localhost:3001

You can also run them separately with `npm run dev` and `npm run server`.

### Test account

```
Email:    testuser@puma.com
Password: password123
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run server` | Start json-server on port 3001 |
| `npm run dev:full` | Run both at the same time |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Project Structure

```
src/
├── api/          # API client (json-server requests)
├── components/   # Reusable UI components
├── data/         # Static data (nav menu, promos, locations)
├── hooks/        # Custom hooks (auth, cart, wishlist, products)
├── layouts/      # Header and footer
├── pages/        # Route pages
├── Promos/       # Announcement and promo banners
└── utils/        # Helper functions
```

## Notes

This project uses a mock backend for learning purposes only. User passwords are stored in plain text in `db.json` and checked on the client. A real application would need a proper backend with hashed passwords and secure authentication.

## Author

**Həmid Ağabəyov** · [GitHub](https://github.com/Hamid-web-arch)
