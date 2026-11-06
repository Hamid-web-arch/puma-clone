import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { getPrimaryColor, priceBuckets } from '../utils/filterProducts'

const sizeOptions = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']

const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
]

function countBy(products, getValue) {
    const counts = new Map()
    products.forEach((product) => {
        const value = getValue(product)
        if (!value) return
        counts.set(value, (counts.get(value) || 0) + 1)
    })
    return [...counts.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
}

function FilterButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 border px-4 py-2 text-sm font-bold uppercase cursor-pointer transition-colors ${active ? 'border-puma-black' : 'border-puma-border hover:border-puma-black'}`}
        >
            {label}
            <IoIosArrowDown size={12} />
        </button>
    )
}

function CheckboxList({ options, selected, onToggle }) {
    if (options.length === 0) {
        return <p className="text-puma-gray text-sm">No options for this selection.</p>
    }

    return (
        <ul className="max-h-72 overflow-y-auto">
            {options.map(({ label, count }) => (
                <li key={label} className="py-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selected.includes(label)}
                            onChange={() => onToggle(label)}
                            className="w-4 h-4"
                        />
                        <span>{label} <span className="text-puma-gray">[{count}]</span></span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

function FilterBar({ products, filters, onToggle, sortBy, onSortChange }) {
    const [openFilter, setOpenFilter] = useState(null)
    const containerRef = useRef(null)

    useEffect(() => {
        function closeOnOutsideClick(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenFilter(null)
            }
        }
        document.addEventListener('mousedown', closeOnOutsideClick)
        return () => document.removeEventListener('mousedown', closeOnOutsideClick)
    }, [])

    const categoryOptions = countBy(products, (product) => product.style)
    const styleOptions = countBy(products, (product) => product.category)
    const colorOptions = countBy(products, getPrimaryColor)
    const sportOptions = countBy(products, (product) => product.sport)
    const fitOptions = countBy(products, (product) => product.fit)
    const priceOptions = priceBuckets
        .map(({ label, min, max }) => ({
            label,
            count: products.filter((product) => product.price >= min && product.price < max).length,
        }))
        .filter((option) => option.count > 0)

    function toggleOpen(key) {
        setOpenFilter((current) => (current === key ? null : key))
    }

    const filterGroups = [
        { key: 'category', label: 'Category', options: categoryOptions },
        { key: 'style', label: 'Style', options: styleOptions },
        { key: 'color', label: 'Color', options: colorOptions },
        { key: 'price', label: 'Price', options: priceOptions },
        { key: 'sport', label: 'Sport', options: sportOptions },
        { key: 'fit', label: 'Fit', options: fitOptions },
    ]

    return (
        <div ref={containerRef} className="flex flex-wrap items-center gap-3">
            <span className="text-puma-gray">
                <HiOutlineAdjustmentsHorizontal size={20} />
            </span>

            {filterGroups.map(({ key, label, options }) => (
                <div key={key} className="relative">
                    <FilterButton label={label} active={openFilter === key} onClick={() => toggleOpen(key)} />
                    {openFilter === key && (
                        <div className="absolute left-0 top-full mt-2 w-64 max-w-[85vw] bg-puma-white text-puma-black border border-puma-border shadow-lg p-4 z-30 normal-case">
                            <CheckboxList
                                options={options}
                                selected={filters[key]}
                                onToggle={(value) => onToggle(key, value)}
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className="relative">
                <FilterButton label="Size" active={openFilter === 'size'} onClick={() => toggleOpen('size')} />
                {openFilter === 'size' && (
                    <div className="absolute left-0 top-full mt-2 w-80 max-w-[85vw] bg-puma-white text-puma-black border border-puma-border shadow-lg p-4 z-30 normal-case">
                        <div className="grid grid-cols-4 gap-2">
                            {sizeOptions.map((size) => (
                                <span key={size} className="border border-puma-border text-center py-2 text-sm">
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative ml-auto">
                <FilterButton
                    label={sortOptions.find((option) => option.value === sortBy)?.label ?? 'Recommended'}
                    active={openFilter === 'sort'}
                    onClick={() => toggleOpen('sort')}
                />
                {openFilter === 'sort' && (
                    <div className="absolute right-0 top-full mt-2 w-56 max-w-[85vw] bg-puma-white text-puma-black border border-puma-border shadow-lg p-2 z-30 normal-case">
                        <ul>
                            {sortOptions.map(({ value, label }) => (
                                <li key={value}>
                                    <button
                                        onClick={() => {
                                            onSortChange(value)
                                            setOpenFilter(null)
                                        }}
                                        className={`w-full text-left px-3 py-2 hover:bg-puma-gray-light cursor-pointer ${sortBy === value ? 'font-bold' : ''}`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FilterBar
