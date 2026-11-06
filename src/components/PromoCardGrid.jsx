import React from 'react'
import { Link } from 'react-router-dom'

function PromoCardGrid({ title, columns, cards }) {
    return (
        <section className="puma-container py-10">
            {title && (
                <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wider text-center mb-8">{title}</h2>
            )}

            <div className={`grid gap-6 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {cards.map((card) => (
                    <div key={card.title} className="text-center">
                        <img src={card.image} alt={card.title} className="w-full aspect-[4/3] object-cover" />
                        <p className="font-heading text-xl font-bold uppercase mt-3">{card.title}</p>
                        {card.subtitle && <p className="text-sm text-puma-gray">{card.subtitle}</p>}

                        <div className="flex flex-col items-center gap-2 mt-4">
                            {card.buttons.map(({ label, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className="bg-puma-black text-white font-bold uppercase text-sm py-2.5 px-6 w-full max-w-[220px] hover:bg-puma-gray transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PromoCardGrid
