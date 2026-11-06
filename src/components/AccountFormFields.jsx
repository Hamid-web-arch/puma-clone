import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

export function FieldLabel({ children }) {
    return (
        <p className="text-sm font-bold uppercase tracking-wide mb-2">
            {children} <span className="text-puma-red">*</span>
        </p>
    )
}

export function PasswordField({ value, onChange }) {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <div className="relative">
            <input
                type={isVisible ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder="Password"
                className="w-full border border-puma-border pl-4 pr-12 py-3 outline-none placeholder:text-puma-gray"
            />
            <button
                type="button"
                onClick={() => setIsVisible((v) => !v)}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-puma-gray cursor-pointer"
            >
                {isVisible ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
        </div>
    )
}

export function SubmitButton({ disabled, children }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`w-full h-12 font-bold uppercase transition-colors ${disabled ? 'bg-puma-border text-puma-gray cursor-not-allowed' : 'bg-puma-black text-white cursor-pointer'}`}
        >
            {children}
        </button>
    )
}

export function ErrorText({ children }) {
    if (!children) return null
    return <p className="text-sm text-puma-red">{children}</p>
}

export function TermsNotice() {
    return (
        <p className="text-xs text-puma-gray">
            By continuing, I confirm that I have read and accept the{' '}
            <a href="#" className="underline hover:text-puma-black">Terms and Conditions</a> and the{' '}
            <a href="#" className="underline hover:text-puma-black">Privacy Policy</a>.
        </p>
    )
}
