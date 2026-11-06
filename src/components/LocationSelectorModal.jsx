import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'
import { locations, flagUrl } from '../data/locations'

function LocationSelectorModal({ onClose }) {
    const [query, setQuery] = useState('')

    const filteredLocations = locations.filter((location) =>
        location.country.toLowerCase().includes(query.trim().toLowerCase())
    )

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-puma-white text-puma-black w-full max-w-[560px] max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-puma-border">
                    <h2 className="font-heading text-xl font-bold">Location Selector</h2>
                    <button onClick={onClose} aria-label="Close" className="cursor-pointer">
                        <IoMdClose size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="relative">
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Location or Language"
                            className="w-full border border-puma-border pl-4 pr-12 py-3 outline-none placeholder:text-puma-gray"
                        />
                        <IoIosSearch size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-puma-gray" />
                    </div>
                </div>

                <ul className="overflow-y-auto px-6 pb-6">
                    {filteredLocations.map(({ country, code, languages }) => (
                        <li key={country} className="flex flex-wrap items-center justify-between gap-2 py-4 border-b border-puma-border">
                            <div className="flex items-center gap-4">
                                <img src={flagUrl(code)} alt={country} className="w-8 h-6 object-cover rounded-sm" />
                                <span>{country}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                {languages.map((language) => (
                                    <button key={language} className="underline hover:text-puma-gray cursor-pointer">
                                        {language}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LocationSelectorModal
