import React from 'react'
import { IoMdClose } from 'react-icons/io'

const mensShoeRows = [
    { us: '6', de: '38', uk: '5', fr: '38', it: '38', es: '38' },
    { us: '6.5', de: '38.5', uk: '5.5', fr: '38.5', it: '38.5', es: '38.5' },
    { us: '7', de: '39', uk: '6', fr: '39', it: '39', es: '39' },
    { us: '7.5', de: '40', uk: '6.5', fr: '40', it: '40', es: '40' },
    { us: '8', de: '40.5', uk: '7', fr: '40.5', it: '40.5', es: '40.5' },
    { us: '8.5', de: '41', uk: '7.5', fr: '41', it: '41', es: '41' },
    { us: '9', de: '42', uk: '8', fr: '42', it: '42', es: '42' },
    { us: '9.5', de: '42.5', uk: '8.5', fr: '42.5', it: '42.5', es: '42.5' },
    { us: '10', de: '43', uk: '9', fr: '43', it: '43', es: '43' },
    { us: '10.5', de: '44', uk: '9.5', fr: '44', it: '44', es: '44' },
    { us: '11', de: '44.5', uk: '10', fr: '44.5', it: '44.5', es: '44.5' },
    { us: '11.5', de: '45', uk: '10.5', fr: '45', it: '45', es: '45' },
    { us: '12', de: '46', uk: '11', fr: '46', it: '46', es: '46' },
    { us: '12.5', de: '46.5', uk: '11.5', fr: '46.5', it: '46.5', es: '46.5' },
    { us: '13', de: '47', uk: '12', fr: '47', it: '47', es: '47' },
    { us: '14', de: '48.5', uk: '13', fr: '48.5', it: '48.5', es: '48.5' },
]

const unisexRows = [
    { men: '4', women: '5.5' },
    { men: '4.5', women: '6' },
    { men: '5', women: '6.5' },
    { men: '5.5', women: '7' },
    { men: '6', women: '7.5' },
    { men: '6.5', women: '8' },
    { men: '7', women: '8.5' },
    { men: '7.5', women: '9' },
    { men: '8', women: '9.5' },
]

function SizeGuideModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-puma-white text-puma-black w-full max-w-[640px] max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-puma-border">
                    <h2 className="font-heading text-xl font-bold">Size Guide</h2>
                    <button onClick={onClose} aria-label="Close" className="cursor-pointer">
                        <IoMdClose size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <h3 className="font-heading text-2xl font-bold mb-6">International Size Conversions</h3>

                    <p className="font-bold mb-3">Men's Shoes</p>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm min-w-[480px]">
                            <thead>
                                <tr className="border-b border-puma-border font-bold uppercase text-left">
                                    <th className="py-2 pr-2">US</th>
                                    <th className="py-2 pr-2">DE</th>
                                    <th className="py-2 pr-2">UK</th>
                                    <th className="py-2 pr-2">FR</th>
                                    <th className="py-2 pr-2">IT</th>
                                    <th className="py-2">ES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mensShoeRows.map((row) => (
                                    <tr key={row.us} className="border-b border-puma-border">
                                        <td className="py-2 pr-2 font-bold">{row.us}</td>
                                        <td className="py-2 pr-2 text-puma-gray">{row.de}</td>
                                        <td className="py-2 pr-2 text-puma-gray">{row.uk}</td>
                                        <td className="py-2 pr-2 text-puma-gray">{row.fr}</td>
                                        <td className="py-2 pr-2 text-puma-gray">{row.it}</td>
                                        <td className="py-2 text-puma-gray">{row.es}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="font-bold mb-2">Unisex Shoes</p>
                    <p className="text-puma-gray text-sm mb-4">
                        Unisex products run in men's sizes only. Women should order 1.5 sizes down from their usual size.
                    </p>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-puma-border font-bold uppercase text-left">
                                <th className="py-2">Men</th>
                                <th className="py-2">Women</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unisexRows.map((row) => (
                                <tr key={row.men} className="border-b border-puma-border">
                                    <td className="py-2 font-bold">{row.men}</td>
                                    <td className="py-2 text-puma-gray">{row.women}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SizeGuideModal
