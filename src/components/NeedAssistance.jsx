import React from 'react'

function NeedAssistance() {
    return (
        <div className="mt-16 pt-10 border-t border-puma-border flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="font-heading text-2xl font-bold">Need assistance?</h2>

            <div className="text-sm space-y-2">
                <p>
                    <span className="text-puma-gray">Email: </span>
                    <a href="mailto:customerservice.us@puma.com" className="underline uppercase">
                        customerservice.us@puma.com
                    </a>
                </p>
                <p>
                    <span className="text-puma-gray">Phone number: </span>
                    <a href="tel:18885657862" className="underline">1-888-565-PUMA (7862)</a>{' '}
                    <span className="text-puma-gray">7AM – MIDNIGHT EST, 7 days a week</span>
                </p>
                <p>
                    <span className="text-puma-gray">Live Chat: </span>
                    <span className="text-puma-gray">7AM – MIDNIGHT EST, 7 days a week</span>
                </p>
            </div>
        </div>
    )
}

export default NeedAssistance
