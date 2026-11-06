import React from 'react'
import NeedAssistance from '../../components/NeedAssistance'

const sidebarLinks = [
    { label: 'Contact Us', active: true },
    { label: 'Financial Incentives', active: false },
]

function ContactUsPage() {
    return (
        <div className="puma-container py-10 min-h-[500px]">
            <div className="flex gap-12">
                <div className="w-48 shrink-0 border-r border-puma-border pr-6 hidden md:block">
                    <ul className="space-y-3">
                        {sidebarLinks.map(({ label, active }) => (
                            <li key={label}>
                                <a href="#" className={active ? 'font-bold underline' : 'hover:underline'}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1 className="font-heading text-2xl font-bold mb-6">
                        Questions, Concerns, Comments? You talk, we listen.
                    </h1>

                    <p className="font-bold mb-4">
                        If you have any additional questions or comments, we would love to hear from you!
                    </p>
                    <p className="mb-6">Submit your query using any of the methods below.</p>

                    <p className="mb-1">
                        <span className="font-bold">Email: </span>
                        <a href="mailto:customerservice.us@puma.com" className="underline">
                            customerservice.us@puma.com
                        </a>
                    </p>
                    <p>
                        <span className="font-bold">Toll-free number: </span>
                        <a href="tel:18885657862" className="underline">1-888-565-PUMA (7862)</a>, 7AM – MIDNIGHT EST, 7 days a week
                    </p>
                </div>
            </div>

            <NeedAssistance />
        </div>
    )
}

export default ContactUsPage
