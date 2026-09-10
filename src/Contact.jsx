import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setSuccess(false)
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setSending(true)
    setSuccess(false)
    setError('')

    try {
      // Send the enquiry to the Supabase Edge Function.
      // The Edge Function handles sending the email through Resend.
      const { data, error: functionError } =
        await supabase.functions.invoke('send-enquiry', {
          body: {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          },
        })

      if (functionError) {
        console.error('Edge Function Error:', functionError)
        throw new Error(
          functionError.message ||
            'Unable to send your enquiry. Please try again.'
        )
      }

      console.log('Enquiry sent:', data)

      // Clear the form after successful submission
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      setSuccess(true)
    } catch (submitError) {
      console.error('Submit Error:', submitError)

      setError(
        submitError.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      <Header />

      {/* ================= HERO BANNER ================= */}
      <section
        className="relative overflow-hidden bg-[#0B1F3A] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5453808/pexels-photo-5453808.jpeg?auto=compress&cs=tinysrgb&w=1800')",
        }}
      >

        <div className="absolute inset-0 bg-[#0B1F3A]/25"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/55 via-[#0B1F3A]/25 to-transparent"></div>

        <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-6 py-24 lg:px-8">

          <div className="max-w-4xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              Get In Touch
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Let&apos;s start a conversation.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
              Whether you are looking for your next opportunity, searching
              for the right talent, or simply have a question, our team is
              ready to hear from you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/jobs"
                className="rounded-lg bg-[#2563EB] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#38BDF8]"
              >
                Browse Opportunities
              </Link>

              <a
                href="#contact-form"
                className="rounded-lg border border-white/50 bg-white/15 px-7 py-3 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0B1F3A]"
              >
                Send an Enquiry
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTACT CONTENT ================= */}
      <main
        id="contact-form"
        className="px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8"
      >

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* ================= CONTACT FORM ================= */}
          <section>

            <div className="text-center lg:text-left">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A72C] sm:text-sm">
                Send an enquiry
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                How can we help?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
                Complete the form below and our recruitment team will
                receive your enquiry.
              </p>

            </div>

            {/* ================= SUCCESS MESSAGE ================= */}
            {success && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-sm font-medium text-green-700">
                Your enquiry has been sent successfully. Our team will
                review your message and get back to you as soon as possible.
              </div>
            )}

            {/* ================= ERROR MESSAGE ================= */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* ================= NAME ================= */}
              <div>

                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#0B1F3A]"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 sm:text-base"
                />

              </div>

              {/* ================= EMAIL ================= */}
              <div>

                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#0B1F3A]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 sm:text-base"
                />

              </div>

              {/* ================= SUBJECT DROPDOWN ================= */}
              <div>

                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-[#0B1F3A]"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className={`mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 sm:text-base ${
                    form.subject
                      ? 'text-[#0B1F3A]'
                      : 'text-slate-400'
                  }`}
                >

                  <option value="" disabled>
                    Select an enquiry type
                  </option>

                  <option value="Job Enquiry">
                    Job Enquiry
                  </option>

                  <option value="Application Support">
                    Application Support
                  </option>

                  <option value="CV / CV Review">
                    CV / CV Review
                  </option>

                  <option value="Recruitment Services">
                    Recruitment Services
                  </option>

                  <option value="Employer Enquiry">
                    Employer Enquiry
                  </option>

                  <option value="Partnership / Business Enquiry">
                    Partnership / Business Enquiry
                  </option>

                  <option value="General Enquiry">
                    General Enquiry
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* ================= MESSAGE ================= */}
              <div>

                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[#0B1F3A]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="7"
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 sm:text-base"
                />

              </div>

              {/* ================= SUBMIT ================= */}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition hover:bg-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>

            </form>

          </section>

          {/* ================= CONTACT INFORMATION ================= */}
          <aside>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A72C] sm:text-sm">
                Contact information
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Let&apos;s talk
              </h2>

              {/* ================= EMAIL ================= */}
              <div className="mt-8 flex items-start gap-4">

                <div className="shrink-0 rounded-lg bg-white p-3 shadow-sm">

                  <svg
                    className="h-5 w-5 text-[#2563EB]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m3 7 9 6 9-6" />

                  </svg>

                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Email
                  </p>

                  <a
                    href="mailto:support@vantoraglobalrecruitments.com"
                    className="mt-1 block break-all text-sm text-[#2563EB] hover:text-[#0B1F3A]"
                  >
                    support@vantoraglobalrecruitments.com
                  </a>

                </div>

              </div>

              {/* ================= BUSINESS HOURS ================= */}
              <div className="mt-7 flex items-start gap-4">

                <div className="shrink-0 rounded-lg bg-white p-3 shadow-sm">

                  <svg
                    className="h-5 w-5 text-[#2563EB]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                    />

                    <path d="M12 7v5l3 2" />

                  </svg>

                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Business Hours
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Monday - Friday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>

                </div>

              </div>

              {/* ================= CANDIDATES ================= */}
              <div className="mt-8 border-t border-slate-200 pt-7">

                <p className="text-sm font-semibold text-[#D4A72C]">
                  For Candidates
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Looking for your next role? Browse our current vacancies
                  and apply directly online.
                </p>

                <Link
                  to="/jobs"
                  className="mt-4 inline-flex font-semibold text-[#2563EB] hover:text-[#0B1F3A]"
                >
                  Browse Jobs →
                </Link>

              </div>

              {/* ================= EMPLOYERS ================= */}
              <div className="mt-7 border-t border-slate-200 pt-7">

                <p className="text-sm font-semibold text-[#D4A72C]">
                  For Employers
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Need talented professionals for your organisation?
                  Tell us what you are looking for.
                </p>

                <a
                  href="mailto:support@vantoraglobalrecruitments.com?subject=Employer%20Enquiry"
                  className="mt-4 inline-flex font-semibold text-[#2563EB] hover:text-[#0B1F3A]"
                >
                  Talk to our team →
                </a>

              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* ================= CTA ================= */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A72C] sm:text-sm">
            Ready for the next step?
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
            Find your next opportunity
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore our current vacancies and discover where your next
            career move could take you.
          </p>

          <Link
            to="/jobs"
            className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#2563EB] px-7 py-3 font-semibold text-white transition hover:bg-[#0B1F3A] sm:w-auto"
          >
            Browse Jobs
          </Link>

        </div>

      </section>

      <Footer />

    </div>
  )
}

export default Contact