import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import LocationSelectorModal from '../../components/LocationSelectorModal'
import { flagUrl } from '../../data/locations'

const supportLinksLeft = [
    'Contact Us',
    'Shipping and Delivery',
    'Return Policy',
    'Gift Card Balance',
    'Service Discount',
    'Student Discount',
    'Transparency in Supply Chain',
    'Cookie Settings',
]

const supportLinksRight = [
    'FAQ',
    'Store Locator',
    'Terms & Conditions',
    'Privacy Policy',
    'Promotion Exclusions',
    'Do Not Sell or Share My Information',
    'Sitemap',
]

const aboutLinks = [
    'Company',
    'Corporate News',
    'Press Center',
    'Investors',
    'Sustainability',
    'Careers',
    'NYC Flagship Store',
    'Las Vegas Flagship Store',
]

const socialLinks = [
    { icon: FaYoutube, label: 'YouTube' },
    { icon: FaXTwitter, label: 'Twitter' },
    { icon: FaPinterestP, label: 'Pinterest' },
    { icon: FaInstagram, label: 'Instagram' },
    { icon: FaFacebookF, label: 'Facebook' },
]

function FooterLinkList({ links }) {
    return (
        <ul className="space-y-2.5">
            {links.map((link) => (
                <li key={link}>
                    <a href="#" className="text-sm text-puma-gray-light/70 hover:text-white transition-colors">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    )
}

function Footer() {
    const [isLocationOpen, setIsLocationOpen] = useState(false)

    return (
        <footer className="bg-puma-black text-white font-sans">
            <div className="puma-container py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="sm:col-span-2 lg:col-span-2">
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">Support</p>
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-8">
                        <FooterLinkList links={supportLinksLeft} />
                        <FooterLinkList links={supportLinksRight} />
                    </div>
                </div>

                <div>
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">About</p>
                    <FooterLinkList links={aboutLinks} />
                </div>

                <div>
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">Stay Up To Date</p>
                    <a href="#" className="text-sm text-white hover:underline">Sign Up for Email</a>
                </div>

                <div>
                    <p className="font-heading font-bold uppercase tracking-wider mb-4">Explore</p>
                    <div className="w-14 h-14 flex flex-col items-center justify-center gap-1 border border-[#4d4d4d] rounded">
                        <img src="/puma-logo.svg" alt="PUMA App" className="w-5 h-5 invert" />
                        <span className="text-[8px] font-bold tracking-wider">APP</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#4d4d4d]">
                <div className="puma-container py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ icon: Icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#4d4d4d] hover:border-white transition-colors"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsLocationOpen(true)}
                        className="flex items-center gap-2 border border-[#4d4d4d] rounded-sm px-6 py-3 text-sm font-bold uppercase hover:border-white transition-colors justify-self-start md:justify-self-center"
                    >
                        <img src={flagUrl('us')} alt="United States" className="w-5 h-4 object-cover rounded-sm" />
                        United States
                    </button>
                </div>
            </div>

            <div className="border-t border-[#4d4d4d]">
                <div className="puma-container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-puma-gray-light/50">
                    <p>&copy; {new Date().getFullYear()} PUMA North America, Inc.</p>
                    <a href="#" className="hover:text-white transition-colors">Imprint and Legal Data</a>
                </div>
            </div>

            {isLocationOpen && <LocationSelectorModal onClose={() => setIsLocationOpen(false)} />}
        </footer>
    )
}

export default Footer
