import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { useCurrentUser } from '../hooks/useCurrentUser'

function DiscountBadge() {
    const [isVisible, setIsVisible] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const user = useCurrentUser()
    const navigate = useNavigate()

    if (!isVisible) return null

    function handleClick() {
        if (user) {
            setShowMessage(true)
        } else {
            navigate('/account')
        }
    }

    return (
        <div className="sticky bottom-0 z-20 px-4 py-4 lg:px-8 lg:py-8 pointer-events-none">
            <div className="overflow-hidden relative inline-block pointer-events-auto tracking-wider bg-puma-white py-2 px-4">
                <span className="attn-border attn-border-right"></span>
                <span className="attn-border attn-border-bottom"></span>
                <span className="attn-border attn-border-left"></span>
                <span className="attn-border attn-border-top"></span>

                <div className="flex items-center gap-2 relative z-10">
                    <button onClick={handleClick} className="cursor-pointer text-sm font-bold">
                        {showMessage ? "Congratulations! You've won a 20% discount" : 'GET 20% OFF'}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-base font-heading text-puma-black font-extrabold cursor-pointer leading-none"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DiscountBadge
