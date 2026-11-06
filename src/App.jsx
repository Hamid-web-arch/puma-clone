import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './layouts/header/Header'
import Footer from './layouts/footer/Footer'
import TopAnnouncementBar from './Promos/TopAnnouncementBar'
import PromoBanner from './Promos/PromoBanner'
import DiscountBadge from './components/DiscountBadge'
import PageLoader from './components/PageLoader'
import { navItems } from './data/navMenu'

const Home = lazy(() => import('./pages/Home/Home'))
const CategoryPage = lazy(() => import('./pages/Category/CategoryPage'))
const SearchPage = lazy(() => import('./pages/Search/SearchPage'))
const AccountPage = lazy(() => import('./pages/Account/AccountPage'))
const ReturnsPage = lazy(() => import('./pages/Returns/ReturnsPage'))
const ContactUsPage = lazy(() => import('./pages/ContactUs/ContactUsPage'))
const CartPage = lazy(() => import('./pages/Cart/CartPage'))
const WishlistPage = lazy(() => import('./pages/Wishlist/WishlistPage'))
const AccountOrdersPage = lazy(() => import('./pages/Account/AccountOrdersPage'))
const AccountAddressesPage = lazy(() => import('./pages/Account/AccountAddressesPage'))
const AccountCardsPage = lazy(() => import('./pages/Account/AccountCardsPage'))
const AccountSettingsPage = lazy(() => import('./pages/Account/AccountSettingsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetail/ProductDetailPage'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

const shortPages = [
  '/account',
  '/returns',
  '/contact-us',
  '/cart',
  '/wishlist',
  '/account/orders',
  '/account/addresses',
  '/account/cards',
  '/account/settings',
]
const noPromoPages = ['/cart', '/returns']

function App() {
  const location = useLocation()
  const isShortPage = shortPages.includes(location.pathname)
  const isHomePage = location.pathname === '/'
  const showPromoBanner = !noPromoPages.includes(location.pathname)
  const isReturnsPage = location.pathname === '/returns'

  return (
    <div>
      {!isReturnsPage && (
        <>
          <TopAnnouncementBar />
          <Header />
        </>
      )}
      {showPromoBanner && <PromoBanner gray={!isHomePage} />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account/orders" element={<AccountOrdersPage />} />
          <Route path="/account/addresses" element={<AccountAddressesPage />} />
          <Route path="/account/cards" element={<AccountCardsPage />} />
          <Route path="/account/settings" element={<AccountSettingsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          {navItems.map(({ slug }) => (
            <Route key={slug} path={`/${slug}`} element={<CategoryPage slug={slug} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isShortPage && <DiscountBadge />}
      {!isReturnsPage && <Footer />}
    </div>
  )
}

export default App
