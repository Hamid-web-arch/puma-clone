import React from 'react'

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <img src="/puma-logo.svg" alt="Loading" className="h-12 w-12 animate-pulse" />
      <p className="font-heading uppercase tracking-wider text-puma-gray text-sm">Loading</p>
    </div>
  )
}

export default PageLoader
