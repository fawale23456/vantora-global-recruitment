import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_CONSENT_KEY = 'vantora_cookie_consent'

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)

    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setShowBanner(false)
  }

  function handleReject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[99999] border-t border-slate-200 bg-white shadow-[0_-6px_25px_rgba(0,0,0,0.15)]"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-3xl">

            <h2 className="text-lg font-bold text-[#0B1F3A]">
              We value your privacy
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              We use cookies and similar technologies to help keep our website
              secure, remember your preferences, and improve your experience.
              Where non-essential cookies are used, we ask for your consent.
              You can accept or reject them at any time.
            </p>

            <Link
              to="/cookie-policy"
              className="mt-2 inline-block text-sm font-semibold text-[#2563EB] transition hover:text-[#D4A72C]"
            >
              Learn more about our Cookie Policy
            </Link>

          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleReject}
              className="rounded-lg border border-[#0B1F3A] px-7 py-3 text-sm font-semibold text-[#0B1F3A] transition duration-200 hover:border-[#D4A72C] hover:text-[#D4A72C]"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={handleAccept}
              className="rounded-lg bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#0B1F3A]"
            >
              Accept
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default CookieConsent