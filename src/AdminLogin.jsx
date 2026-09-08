import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'
import vantoraLogo from './assets/vantora-logo.png'

function AdminLogin() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('signin')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')

  const [showSignInPassword, setShowSignInPassword] = useState(false)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [rememberMe, setRememberMe] = useState(false)

  const [loading, setLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function switchTab(tab) {
    setActiveTab(tab)
    setMessage('')
    setError('')
  }

  async function handleSignIn(event) {
    event.preventDefault()

    setError('')
    setMessage('')
    setLoading(true)

    const email = signInEmail.trim()

    if (!email || !signInPassword) {
      setError('Please enter your email address and password.')
      setLoading(false)
      return
    }

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password: signInPassword,
      })

    if (signInError) {
      setError(
        signInError.message ||
          'Unable to sign in. Please check your email and password.',
      )
      setLoading(false)
      return
    }

    if (!data?.user) {
      setError('Unable to sign in. Please try again.')
      setLoading(false)
      return
    }

    navigate('/admin', { replace: true })
  }

  async function handleSignUp(event) {
    event.preventDefault()

    setError('')
    setMessage('')

    const name = signUpName.trim()
    const email = signUpEmail.trim()

    if (!name || !email || !signUpPassword || !signUpConfirmPassword) {
      setError('Please complete all fields.')
      return
    }

    if (signUpPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: signUpPassword,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (signUpError) {
      setError(
        signUpError.message ||
          'Unable to create the account. Please try again.',
      )
      setLoading(false)
      return
    }

    if (data?.session) {
      navigate('/admin', { replace: true })
      return
    }

    setMessage(
      'Account created successfully. Please check your email to confirm your account before signing in.',
    )

    setSignUpName('')
    setSignUpEmail('')
    setSignUpPassword('')
    setSignUpConfirmPassword('')

    setLoading(false)
  }

  async function handleForgotPassword() {
    setError('')
    setMessage('')

    const email = signInEmail.trim()

    if (!email) {
      setError('Enter your email address first, then click "Forgot password?".')
      return
    }

    setForgotLoading(true)

    const redirectUrl = `${window.location.origin}/admin/login`

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

    if (resetError) {
      setError(
        resetError.message ||
          'Unable to send the password reset email.',
      )
      setForgotLoading(false)
      return
    }

    setMessage(
      'Password reset instructions have been sent to your email address.',
    )

    setForgotLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F1EC] text-[#19120C]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================================
            LEFT SIDE - ADMIN BRANDING
        ========================================================= */}

        <section className="relative hidden overflow-hidden bg-[#19120C] lg:flex">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#19120C]/80" />

          {/* Orange overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A2C17]/50 via-transparent to-[#19120C]/90" />

          {/* Decorative circles */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-[#E85A2A]/20" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-[#E85A2A]/10" />

          <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-16">

            {/* Logo */}
            <div>
              <Link to="/" className="inline-block">
                <img
                  src={vantoraLogo}
                  alt="Vantora Global Recruitment"
                  className="h-20 w-auto object-contain"
                />
              </Link>

              <div className="mt-8 h-1 w-16 bg-[#E85A2A]" />

              <div className="mt-6 flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                <span>People</span>
                <span className="text-[#E85A2A]">|</span>
                <span>Opportunities</span>
                <span className="text-[#E85A2A]">|</span>
                <span>Growth</span>
              </div>
            </div>

            {/* Main branding */}
            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#E85A2A]">
                Vantora Administration
              </p>

              <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-white xl:text-6xl">

                Find the opportunity,
                
                <span className="block text-[#E85A2A]">
                  build the right team.
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                Manage your recruitment platform, applications, enquiries
                and opportunities from one secure administration dashboard.
              </p>

              {/* Feature list */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E85A2A]">

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.212-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Manage Vacancies
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Create, edit and manage job opportunities.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E85A2A]">

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-10a4 4 0 110 8 4 4 0 010-8zm6 4a3 3 0 10-6 0 3 3 0 006 0z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Review Applications
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Track candidates throughout the recruitment process.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E85A2A]">

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M8 10h8m-8 4h5m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Manage Enquiries
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Stay on top of messages from candidates and employers.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom */}
            <div className="text-xs text-white/40">
              © {new Date().getFullYear()} Vantora Global Recruitment.
              All rights reserved.
            </div>

          </div>

        </section>

        {/* =========================================================
            RIGHT SIDE - LOGIN / SIGN UP
        ========================================================= */}

        <section className="flex min-h-screen flex-col bg-[#F5F1EC]">

          {/* Top navigation */}
          <div className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-10">

            {/* Mobile logo */}
            <Link
              to="/"
              className="flex items-center lg:hidden"
            >
              <img
                src={vantoraLogo}
                alt="Vantora Global Recruitment"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:block" />

            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#C95731] transition hover:text-[#19120C]"
            >
              <svg
                className="h-4 w-4 transition group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              Back to Website
            </Link>

          </div>

          {/* Auth container */}
          <div className="flex flex-1 items-center justify-center px-4 pb-10 pt-2 sm:px-6 lg:px-10 lg:pb-16">

            <div className="w-full max-w-xl">

              {/* Card */}
              <div className="overflow-hidden rounded-[28px] border border-[#DED8D1] bg-white shadow-[0_25px_70px_rgba(25,18,12,0.10)]">

                {/* Tabs */}
                <div className="grid grid-cols-2 border-b border-[#E8E3DD]">

                  <button
                    type="button"
                    onClick={() => switchTab('signin')}
                    className={`relative flex items-center justify-center gap-3 px-5 py-6 text-sm font-bold transition ${
                      activeTab === 'signin'
                        ? 'text-[#C95731]'
                        : 'text-[#817A73] hover:text-[#19120C]'
                    }`}
                  >

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M15 19a4 4 0 00-8 0m4-8a4 4 0 100-8 4 4 0 000 8zm8 8a4 4 0 00-3-3.87M17 7a4 4 0 010 7.75"
                      />
                    </svg>

                    Sign In

                    {activeTab === 'signin' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E85A2A]" />
                    )}

                  </button>

                  <button
                    type="button"
                    onClick={() => switchTab('signup')}
                    className={`relative flex items-center justify-center gap-3 px-5 py-6 text-sm font-bold transition ${
                      activeTab === 'signup'
                        ? 'text-[#C95731]'
                        : 'text-[#817A73] hover:text-[#19120C]'
                    }`}
                  >

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM4 21a8 8 0 0116 0M19 8v6m3-3h-6"
                      />
                    </svg>

                    Sign Up

                    {activeTab === 'signup' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E85A2A]" />
                    )}

                  </button>

                </div>

                {/* Content */}
                <div className="p-7 sm:p-10">

                  {/* Icon */}
                  <div className="flex justify-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0EA] text-[#E85A2A]">

                      {activeTab === 'signin' ? (
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-9V7a4 4 0 10-8 0v3h8z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM4 21a8 8 0 0116 0M19 8v6m3-3h-6"
                          />
                        </svg>
                      )}

                    </div>

                  </div>

                  {/* Heading */}
                  <div className="mt-6 text-center">

                    <h2 className="text-3xl font-bold tracking-tight text-[#19120C]">
                      {activeTab === 'signin'
                        ? 'Welcome Back'
                        : 'Create Admin Account'}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#817A73]">
                      {activeTab === 'signin'
                        ? 'Sign in to access your Vantora administration dashboard.'
                        : 'Create an account to access the Vantora administration area.'}
                    </p>

                  </div>

                  {/* Messages */}
                  {error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                      {message}
                    </div>
                  )}

                  {/* =================================================
                      SIGN IN FORM
                  ================================================= */}

                  {activeTab === 'signin' && (
                    <form
                      onSubmit={handleSignIn}
                      className="mt-8 space-y-5"
                    >

                      {/* Email */}
                      <div>

                        <label
                          htmlFor="signin-email"
                          className="mb-2 block text-sm font-semibold text-[#302821]"
                        >
                          Email Address
                        </label>

                        <div className="relative">

                          <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A39B94]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                            />
                          </svg>

                          <input
                            id="signin-email"
                            type="email"
                            value={signInEmail}
                            onChange={(event) =>
                              setSignInEmail(event.target.value)
                            }
                            placeholder="Enter your email address"
                            autoComplete="email"
                            className="w-full rounded-xl border border-[#DDD7D0] bg-white py-4 pl-12 pr-4 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                          />

                        </div>

                      </div>

                      {/* Password */}
                      <div>

                        <div className="mb-2 flex items-center justify-between">

                          <label
                            htmlFor="signin-password"
                            className="block text-sm font-semibold text-[#302821]"
                          >
                            Password
                          </label>

                        </div>

                        <div className="relative">

                          <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A39B94]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M6 10V8a6 6 0 1112 0v2m-9 4h.01M12 14v.01M15 14h.01M6 10h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"
                            />
                          </svg>

                          <input
                            id="signin-password"
                            type={
                              showSignInPassword
                                ? 'text'
                                : 'password'
                            }
                            value={signInPassword}
                            onChange={(event) =>
                              setSignInPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="w-full rounded-xl border border-[#DDD7D0] bg-white py-4 pl-12 pr-12 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowSignInPassword(
                                !showSignInPassword,
                              )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A39B94] transition hover:text-[#E85A2A]"
                            aria-label={
                              showSignInPassword
                                ? 'Hide password'
                                : 'Show password'
                            }
                          >

                            {showSignInPassword ? (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 4.24A10.45 10.45 0 0112 4c5 0 9.27 3.11 10.5 8a11.8 11.8 0 01-1.65 3.64M6.61 6.61C4.62 7.94 3.18 9.78 1.5 12c1.23 4.89 5.5 8 10.5 8a10.4 10.4 0 004.17-.87"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  strokeWidth="1.8"
                                />
                              </svg>
                            )}

                          </button>

                        </div>

                      </div>

                      {/* Remember / Forgot */}
                      <div className="flex items-center justify-between gap-4">

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-[#817A73]">

                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) =>
                              setRememberMe(event.target.checked)
                            }
                            className="h-4 w-4 rounded border-[#CFC7BF] accent-[#E85A2A]"
                          />

                          Remember me

                        </label>

                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          disabled={forgotLoading}
                          className="text-sm font-semibold text-[#C95731] transition hover:text-[#19120C] disabled:opacity-50"
                        >
                          {forgotLoading
                            ? 'Sending...'
                            : 'Forgot password?'}
                        </button>

                      </div>

                      {/* Sign In */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-xl bg-[#E85A2A] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#E85A2A]/20 transition hover:bg-[#C94A22] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">

                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                            Signing In...

                          </span>
                        ) : (
                          'Sign In'
                        )}
                      </button>

                    </form>
                  )}

                  {/* =================================================
                      SIGN UP FORM
                  ================================================= */}

                  {activeTab === 'signup' && (
                    <form
                      onSubmit={handleSignUp}
                      className="mt-8 space-y-5"
                    >

                      {/* Name */}
                      <div>

                        <label
                          htmlFor="signup-name"
                          className="mb-2 block text-sm font-semibold text-[#302821]"
                        >
                          Full Name
                        </label>

                        <input
                          id="signup-name"
                          type="text"
                          value={signUpName}
                          onChange={(event) =>
                            setSignUpName(event.target.value)
                          }
                          placeholder="Enter your full name"
                          autoComplete="name"
                          className="w-full rounded-xl border border-[#DDD7D0] bg-white px-4 py-4 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                        />

                      </div>

                      {/* Email */}
                      <div>

                        <label
                          htmlFor="signup-email"
                          className="mb-2 block text-sm font-semibold text-[#302821]"
                        >
                          Email Address
                        </label>

                        <input
                          id="signup-email"
                          type="email"
                          value={signUpEmail}
                          onChange={(event) =>
                            setSignUpEmail(event.target.value)
                          }
                          placeholder="Enter your email address"
                          autoComplete="email"
                          className="w-full rounded-xl border border-[#DDD7D0] bg-white px-4 py-4 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                        />

                      </div>

                      {/* Password */}
                      <div>

                        <label
                          htmlFor="signup-password"
                          className="mb-2 block text-sm font-semibold text-[#302821]"
                        >
                          Password
                        </label>

                        <div className="relative">

                          <input
                            id="signup-password"
                            type={
                              showSignUpPassword
                                ? 'text'
                                : 'password'
                            }
                            value={signUpPassword}
                            onChange={(event) =>
                              setSignUpPassword(event.target.value)
                            }
                            placeholder="Create a password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-[#DDD7D0] bg-white px-4 py-4 pr-12 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowSignUpPassword(
                                !showSignUpPassword,
                              )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A39B94] hover:text-[#E85A2A]"
                            aria-label="Toggle password visibility"
                          >
                            {showSignUpPassword ? 'Hide' : 'Show'}
                          </button>

                        </div>

                      </div>

                      {/* Confirm password */}
                      <div>

                        <label
                          htmlFor="signup-confirm-password"
                          className="mb-2 block text-sm font-semibold text-[#302821]"
                        >
                          Confirm Password
                        </label>

                        <div className="relative">

                          <input
                            id="signup-confirm-password"
                            type={
                              showConfirmPassword
                                ? 'text'
                                : 'password'
                            }
                            value={signUpConfirmPassword}
                            onChange={(event) =>
                              setSignUpConfirmPassword(
                                event.target.value,
                              )
                            }
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-[#DDD7D0] bg-white px-4 py-4 pr-12 text-sm text-[#19120C] outline-none transition placeholder:text-[#A39B94] focus:border-[#E85A2A] focus:ring-4 focus:ring-[#E85A2A]/10"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword,
                              )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A39B94] hover:text-[#E85A2A]"
                            aria-label="Toggle password visibility"
                          >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                          </button>

                        </div>

                      </div>

                      {/* Sign Up */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-xl bg-[#E85A2A] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#E85A2A]/20 transition hover:bg-[#C94A22] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">

                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                            Creating Account...

                          </span>
                        ) : (
                          'Create Admin Account'
                        )}
                      </button>

                    </form>
                  )}

                  {/* Bottom divider */}
                  <div className="mt-8 border-t border-[#E8E3DD] pt-6 text-center">

                    {activeTab === 'signin' ? (
                      <p className="text-sm text-[#817A73]">

                        Don't have an admin account?

                        <button
                          type="button"
                          onClick={() => switchTab('signup')}
                          className="ml-1 font-bold text-[#C95731] hover:text-[#19120C]"
                        >
                          Create one
                        </button>

                      </p>
                    ) : (
                      <p className="text-sm text-[#817A73]">

                        Already have an admin account?

                        <button
                          type="button"
                          onClick={() => switchTab('signin')}
                          className="ml-1 font-bold text-[#C95731] hover:text-[#19120C]"
                        >
                          Sign in
                        </button>

                      </p>
                    )}

                  </div>

                </div>

              </div>

              {/* Security note */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#817A73]">

                <svg
                  className="h-4 w-4 text-[#C95731]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 3l7 4v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V7l7-4z"
                  />
                </svg>

                Secure Vantora Administration Portal

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default AdminLogin