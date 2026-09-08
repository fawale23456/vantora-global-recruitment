import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Reviews() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    role_or_company: '',
    rating: 5,
    message: '',
    permission_to_publish: false,
  })

  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [testimonialError, setTestimonialError] = useState('')

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    setLoadingTestimonials(true)
    setTestimonialError('')

    const { data, error: fetchError } = await supabase
      .from('testimonials')
      .select(
        'id, name, type, role_or_company, rating, message, created_at'
      )
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setTestimonials([])
      setTestimonialError(
        'We could not load the published testimonials at the moment.'
      )
    } else {
      setTestimonials(data || [])
    }

    setLoadingTestimonials(false)
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSuccess(false)

    if (!form.permission_to_publish) {
      setError(
        'Please confirm that you give permission for your feedback to be published.'
      )
      return
    }

    setSending(true)

    const { error: insertError } = await supabase
      .from('testimonials')
      .insert([
        {
          name: form.name,
          email: form.email,
          type: form.type,
          role_or_company: form.role_or_company,
          rating: Number(form.rating),
          message: form.message,
          permission_to_publish: form.permission_to_publish,
          status: 'pending',
        },
      ])

    if (insertError) {
      setError(
        'We could not submit your feedback right now. Please try again.'
      )
    } else {
      setSuccess(
        'Thank you for sharing your experience. Your review has been submitted and is awaiting approval.'
      )

      setForm({
        name: '',
        email: '',
        type: '',
        role_or_company: '',
        rating: 5,
        message: '',
        permission_to_publish: false,
      })
    }

    setSending(false)
  }

  function renderStars(rating) {
    const numericRating = Number(rating) || 0

    return (
      <span
        className="text-lg tracking-[0.12em] text-[#D4A72C]"
        aria-label={`${numericRating} out of 5 stars`}
      >
        {'★'.repeat(numericRating)}
        <span className="text-slate-300">
          {'★'.repeat(5 - numericRating)}
        </span>
      </span>
    )
  }

  function formatDate(date) {
    if (!date) return ''

    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      <Header />


      {/* Hero Banner */}
      <section className="relative overflow-hidden px-6 py-20 text-white md:py-28">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/18287137/pexels-photo-18287137.jpeg?cs=srgb&dl=pexels-oluseyi-18287137.jpg&fm=jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#0B1F3A]/75" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
            Testimonials
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Your experience matters to us.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            At Vantora Global Recruitment, we believe great recruitment
            is built on trust, communication and genuine relationships.
            We value the experiences of the candidates and employers we
            work with.
          </p>

        </div>
      </section>


      {/* Introduction */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4A72C]">
            Our Approach
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
            Real experiences. Genuine feedback.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
            Every candidate and employer has a different experience,
            and we believe those experiences matter. Our testimonials
            provide an honest look at what it is like to work with
            Vantora Global Recruitment.
          </p>

        </div>
      </section>


      {/* Published Testimonials */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4A72C]">
                Client Feedback
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                What our clients say
              </h2>

            </div>

            <button
              type="button"
              onClick={loadTestimonials}
              className="inline-flex w-fit items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Refresh Reviews
            </button>

          </div>

          {loadingTestimonials ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <div className="h-5 w-28 rounded bg-slate-200" />
                  <div className="mt-6 h-4 w-full rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-5/6 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-4/6 rounded bg-slate-200" />
                  <div className="mt-8 h-4 w-32 rounded bg-slate-200" />
                </div>
              ))}

            </div>

          ) : testimonialError ? (

            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              {testimonialError}
            </div>

          ) : testimonials.length > 0 ? (

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >

                  <div>
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="mt-6 flex-1 text-base leading-8 text-slate-600">
                    “{testimonial.message}”
                  </p>

                  <div className="mt-8 border-t border-slate-100 pt-5">

                    <p className="font-semibold text-[#0B1F3A]">
                      {testimonial.name}
                    </p>

                    {testimonial.role_or_company && (
                      <p className="mt-1 text-sm text-slate-500">
                        {testimonial.role_or_company}
                      </p>
                    )}

                    {testimonial.type && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#2563EB]">
                        {testimonial.type}
                      </p>
                    )}

                    <p className="mt-3 text-xs text-slate-400">
                      {formatDate(testimonial.created_at)}
                    </p>

                  </div>

                </article>
              ))}

            </div>

          ) : (

            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">

              <h3 className="text-xl font-semibold text-[#0B1F3A]">
                We’re building our collection of reviews.
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                If you have worked with Vantora Global Recruitment,
                we would love to hear about your experience.
              </p>

            </div>

          )}

        </div>
      </section>


      {/* Share Your Experience */}
      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4A72C]">
              Share Your Experience
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
              Tell us about your experience with Vantora
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Your feedback helps us understand what we are doing well
              and where we can continue to improve.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
          >

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  I am a
                </label>

                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                >
                  <option value="">Select one</option>
                  <option value="Candidate">Candidate</option>
                  <option value="Employer">Employer</option>
                  <option value="Partner">Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="role_or_company"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Role or company
                </label>

                <input
                  id="role_or_company"
                  name="role_or_company"
                  type="text"
                  value={form.role_or_company}
                  onChange={handleChange}
                  placeholder="Your role or company name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Your rating
                </label>

                <select
                  id="rating"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div className="md:col-span-2">

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Tell us about your experience
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Share your experience with Vantora Global Recruitment..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

              </div>

              <div className="md:col-span-2">

                <label className="flex cursor-pointer items-start gap-3">

                  <input
                    type="checkbox"
                    name="permission_to_publish"
                    checked={form.permission_to_publish}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I give Vantora Global Recruitment permission to
                    publish my feedback on its website. I understand
                    that my name, role/company and review may be
                    displayed publicly.
                  </span>

                </label>

              </div>

            </div>

            <div className="mt-8">

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Submitting...' : 'Submit Your Review'}
              </button>

            </div>

          </form>

        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#0B1F3A] px-6 py-20 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4A72C]">
            Take the next step
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Ready to make your next move?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Whether you are looking for your next opportunity or
            searching for the right talent, Vantora Global Recruitment
            is ready to help.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-white hover:text-[#0B1F3A]"
            >
              Browse Jobs
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:border-white hover:bg-white hover:text-[#0B1F3A]"
            >
              Contact Our Team
            </Link>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  )
}

export default Reviews