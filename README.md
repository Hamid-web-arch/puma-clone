# PUMA Store Clone

**A responsive e-commerce storefront inspired by the PUMA online store, built with React 19, Vite and Tailwind CSS.**

### 🔗 [Live Demo](https://hamid-web-arch.github.io/puma-clone/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?logo=github&logoColor=white)

<!-- Add a screenshot: save it as docs/screenshot.png and uncomment the line below -->
<!-- ![PUMA Store Clone screenshot](docs/screenshot.png) -->

This was my final project for my web development course. I built a multi-page online store from scratch: browsing and filtering products, a cart and wishlist, and a full user account area.

> **Try it with the demo account:** `testuser@puma.com` / `password123`, or sign up with any email.

---

## ✨ Features

**Shopping**
- Home page with a hero section, promo cards and product carousels
- Category pages (Women, Men, Kids, Lifestyle, Sport, Sale and more) with style and sport filters
- Product search
- Product detail page with size selection and a size guide modal
- Shopping cart with quantity controls, plus a wishlist

**User accounts**
- Sign up and log in
- Account area with orders, saved addresses, saved cards and profile settings

**Other details**
- Returns, Contact Us and a custom 404 page
- Region selector, announcement bar and promo banners
- Mega-menu navigation with dropdowns
- Lazy-loaded routes with a loading screen
- Fully responsive, from mobile to desktop

## 🛠 Tech Stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS 4, React Icons |
| Sliders | Swiper |
| Build tool | Vite |
| Data | Static JSON + `localStorage` |
| Linting | Oxlint |
| Deployment | GitHub Pages via GitHub Actions |

## 💡 What I Worked On

- **Component architecture:** reusable UI pieces (product cards, carousels, filter bar, modals) shared across pages
- **Custom hooks** for auth, cart, wishlist and product data, keeping logic out of the components
- **State that persists:** the cart, wishlist and user session survive page reloads and stay in sync across components
- **Routing:** nested account pages, dynamic product routes, and category routes generated from data
- **Performance:** code splitting with `React.lazy` and `Suspense`
- **Deployment:** automatic build and deploy to GitHub Pages on every push

## 🚀 Run Locally

```bash
git clone https://github.com/Hamid-web-arch/puma-clone.git
cd puma-clone
npm install
npm run dev
```

Then open http://localhost:5173/puma-clone/

No backend is needed. Products come from `db.json`, and accounts, addresses and cards are stored in the browser's `localStorage`.

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## 📁 Project Structure

```
src/
├── api/          # Data layer (db.json + localStorage)
├── components/   # Reusable UI components
├── data/         # Static data (nav menu, promos, locations)
├── hooks/        # Custom hooks (auth, cart, wishlist, products)
├── layouts/      # Header and footer
├── pages/        # Route pages
├── Promos/       # Announcement and promo banners
└── utils/        # Helper functions
```

## 📝 Notes

- This is a front-end project. User data is saved only in your own browser, and passwords are not encrypted, so please don't use a real password. A production app would need a real backend with secure authentication.
- **Disclaimer:** This is an educational project. It is not affiliated with, endorsed by, or connected to PUMA SE. All trademarks, logos, product names and images belong to their respective owners.

## 👤 Author

**Həmid Ağabəyov**
[GitHub](https://github.com/Hamid-web-arch)
