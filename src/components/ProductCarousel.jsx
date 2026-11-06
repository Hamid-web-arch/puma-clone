import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Scrollbar, Mousewheel, FreeMode } from 'swiper/modules'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import ProductCard from './ProductCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'

function NavButtons() {
    const swiper = useSwiper()

    return (
        <>
            <button
                type="button"
                onClick={() => swiper.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
            >
                <IoIosArrowBack size={22} />
            </button>
            <button
                type="button"
                onClick={() => swiper.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
            >
                <IoIosArrowForward size={22} />
            </button>
        </>
    )
}

function ProductCarousel({ title, products, className = 'puma-container pt-10 pb-8 relative product-carousel' }) {
    return (
        <section className={className}>
            {title && (
                <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wider mb-6">{title}</h2>
            )}

            <Swiper
                modules={[Navigation, Scrollbar, Mousewheel, FreeMode]}
                spaceBetween={16}
                slidesPerView="auto"
                scrollbar={{ draggable: true }}
                grabCursor={true}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true, // yalnız üfüqi scroll-u tutur, səhifənin şaquli scroll-una mane olmur
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={`${product.id}-${index}`} style={{ width: '280px' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                <NavButtons />
            </Swiper>
        </section>
    )
}

export default ProductCarousel
