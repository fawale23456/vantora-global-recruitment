import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  async function loadTestimonials() {
    setLoading(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error loading testimonials:', fetchError)
      setError(fetchError.message)
      setTestimonials([])
    } else {
      setTestimonials(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function updateStatus(id, status) {
    setUpdatingId(id)
    setError('')

    const { error: updateError } = await supabase
      .from('testimonials')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating testimonial:', updateError)
      setError(updateError.message)
      setUpdatingId(null)
      return
    }

    setTestimonials((current) =>
      current.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              status,
              updated_at: new Date().toISOString(),
            }
          : testimonial
      )
    )

    setUpdatingId(null)
  }

  function getStatusClasses(status) {
    switch (status) {
      case 'published':
        return 'bg-green-50 text-green-700 border-green-200'

      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200'

      case 'archived':
        return 'bg-slate-100 text-slate-600 border-slate-200'

      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  function formatDate(date) {
    if (!date) return '—'

    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const pendingCount = testimonials.filter(
    (testimonial) => testimonial.status === 'pending'
  ).length

  const publishedCount = testimonials.filter(
    (testimonial) => testimonial.status === 'published'
  ).length

  const rejectedCount = testimonials.filter(
    (testimonial) => testimonial.status === 'rejected'
  ).length

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            to="/admin"
            className="block shrink-0"
          >
            <h1 className="text-xl font-bold tracking-wide">
              VANTORA
            </h1>

            <p className="text-[10px] tracking-[0.2em] text-[#2563EB] sm:text-xs">
              GLOBAL RECRUITMENT
            </p>
          </Link>

          {/* HEADER ACTION */}
          <Link
            to="/admin"
            className="rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
          >
            ← Dashboard
          </Link>

        </div>

      </header>


      {/* MAIN */}
      <main className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* PAGE INTRO */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              Customer Feedback
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Testimonials
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Review testimonials submitted by candidates and employers
              before publishing them on the Vantora website.
            </p>

          </div>


          {/* SUMMARY CARDS */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">

            {/* PENDING */}
            <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                Pending Review
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-700">
                {loading ? '...' : pendingCount}
              </p>

            </div>


            {/* PUBLISHED */}
            <div className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                Published
              </p>

              <p className="mt-2 text-3xl font-bold text-green-700">
                {loading ? '...' : publishedCount}
              </p>

            </div>


            {/* REJECTED */}
            <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                Rejected
              </p>

              <p className="mt-2 text-3xl font-bold text-red-700">
                {loading ? '...' : rejectedCount}
              </p>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}


          {/* TESTIMONIAL LIST */}
          <section className="mt-10">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Submitted Testimonials
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage customer feedback.
                </p>
              </div>

              <button
                type="button"
                onClick={loadTestimonials}
                disabled={loading}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>

            </div>


            {/* LOADING */}
            {loading && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading testimonials...
                </p>

              </div>
            )}


            {/* EMPTY STATE */}
            {!loading && testimonials.length === 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No testimonials yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  When candidates or employers submit testimonials,
                  they will appear here for review.
                </p>

              </div>
            )}


            {/* TESTIMONIAL CARDS */}
            {!loading && testimonials.length > 0 && (
              <div className="mt-6 space-y-5">

                {testimonials.map((testimonial) => (

                  <article
                    key={testimonial.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                  >

                    {/* TOP */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-xl font-bold">
                            {testimonial.name}
                          </h3>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                              testimonial.status
                            )}`}
                          >
                            {testimonial.status || 'pending'}
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {testimonial.type || '—'}
                          {testimonial.role_or_company
                            ? ` • ${testimonial.role_or_company}`
                            : ''}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Submitted {formatDate(testimonial.created_at)}
                        </p>

                      </div>


                      {/* RATING */}
                      <div className="shrink-0">

                        <div className="flex items-center gap-1 text-lg">
                          {Array.from(
                            { length: 5 },
                            (_, index) => (
                              <span
                                key={index}
                                className={
                                  index <
                                  Number(testimonial.rating || 0)
                                    ? 'text-[#D4A72C]'
                                    : 'text-slate-200'
                                }
                              >
                                ★
                              </span>
                            )
                          )}
                        </div>

                        <p className="mt-1 text-right text-xs text-slate-400">
                          {testimonial.rating || 0}/5
                        </p>

                      </div>

                    </div>


                    {/* MESSAGE */}
                    <div className="mt-6 rounded-xl bg-slate-50 p-5">

                      <p className="whitespace-pre-line leading-7 text-slate-700">
                        “{testimonial.message}”
                      </p>

                    </div>


                    {/* SUBMITTER DETAILS */}
                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Email
                        </p>

                        <p className="mt-1 break-all text-sm text-slate-700">
                          {testimonial.email}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Publishing Permission
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {testimonial.permission_to_publish
                            ? 'Permission granted'
                            : 'Permission not granted'}
                        </p>
                      </div>

                    </div>


                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap">

                      {/* APPROVE */}
                      {testimonial.status !== 'published' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              testimonial.id,
                              'published'
                            )
                          }
                          disabled={updatingId === testimonial.id}
                          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {updatingId === testimonial.id
                            ? 'Updating...'
                            : 'Approve & Publish'}
                        </button>
                      )}


                      {/* REJECT */}
                      {testimonial.status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              testimonial.id,
                              'rejected'
                            )
                          }
                          disabled={updatingId === testimonial.id}
                          className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Reject
                        </button>
                      )}


                      {/* ARCHIVE */}
                      {testimonial.status !== 'archived' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              testimonial.id,
                              'archived'
                            )
                          }
                          disabled={updatingId === testimonial.id}
                          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Archive
                        </button>
                      )}

                    </div>

                  </article>

                ))}

              </div>
            )}

          </section>

        </div>

      </main>

    </div>
  )
}

export default AdminTestimonials