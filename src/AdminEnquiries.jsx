import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  async function loadEnquiries() {
    setLoading(true)
    setError('')

    const { data, error: enquiryError } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (enquiryError) {
      console.error(enquiryError)
      setError(enquiryError.message)
      setLoading(false)
      return
    }

    setEnquiries(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadEnquiries()
  }, [])

  async function updateStatus(id, status) {
    setUpdatingId(id)
    setError('')

    const { error: updateError } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)

    if (updateError) {
      console.error(updateError)
      setError(updateError.message)
      setUpdatingId(null)
      return
    }

    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id
          ? { ...enquiry, status }
          : enquiry
      )
    )

    setUpdatingId(null)
  }

  function formatDate(date) {
    return new Date(date).toLocaleString()
  }

  const filteredEnquiries =
    filterStatus === 'All'
      ? enquiries
      : enquiries.filter(
          (enquiry) => enquiry.status === filterStatus
        )

  const statusCounts = {
    All: enquiries.length,
    New: enquiries.filter(
      (enquiry) => enquiry.status === 'New'
    ).length,
    Pending: enquiries.filter(
      (enquiry) => enquiry.status === 'Pending'
    ).length,
    Reviewed: enquiries.filter(
      (enquiry) => enquiry.status === 'Reviewed'
    ).length,
    Resolved: enquiries.filter(
      (enquiry) => enquiry.status === 'Resolved'
    ).length,
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div>
            <h1 className="text-lg font-bold sm:text-xl">
              VANTORA ADMIN
            </h1>

            <p className="text-xs text-slate-500">
              Enquiries
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/admin"
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold transition hover:border-[#2563EB] hover:text-[#2563EB] sm:px-4 sm:text-sm"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/applications"
              className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-[#2563EB] hover:text-[#2563EB] sm:inline-flex"
            >
              Applications
            </Link>

          </div>

        </div>

      </header>


      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* TITLE */}
        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A72C]">
            Contact enquiries
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Enquiries
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            View and manage messages submitted through the website contact form.
          </p>

        </div>


        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}


        {/* FILTER */}
        {!loading && enquiries.length > 0 && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h3 className="text-lg font-bold">
                  Filter Enquiries
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Quickly view enquiries by their current status.
                </p>

              </div>


              <div className="w-full lg:w-64">

                <label
                  htmlFor="enquiry-filter"
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Status
                </label>

                <select
                  id="enquiry-filter"
                  value={filterStatus}
                  onChange={(event) =>
                    setFilterStatus(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All enquiries ({statusCounts.All})
                  </option>

                  <option value="New">
                    New ({statusCounts.New})
                  </option>

                  <option value="Pending">
                    Pending ({statusCounts.Pending})
                  </option>

                  <option value="Reviewed">
                    Reviewed ({statusCounts.Reviewed})
                  </option>

                  <option value="Resolved">
                    Resolved ({statusCounts.Resolved})
                  </option>
                </select>

              </div>

            </div>


            {/* STATUS SUMMARY */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">

              <button
                type="button"
                onClick={() => setFilterStatus('All')}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  filterStatus === 'All'
                    ? 'border-[#2563EB] bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <p className="text-xs font-semibold text-slate-500">
                  All
                </p>

                <p className="mt-1 text-xl font-bold">
                  {statusCounts.All}
                </p>
              </button>


              <button
                type="button"
                onClick={() => setFilterStatus('New')}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  filterStatus === 'New'
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <p className="text-xs font-semibold text-blue-700">
                  New
                </p>

                <p className="mt-1 text-xl font-bold">
                  {statusCounts.New}
                </p>
              </button>


              <button
                type="button"
                onClick={() => setFilterStatus('Pending')}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  filterStatus === 'Pending'
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <p className="text-xs font-semibold text-amber-700">
                  Pending
                </p>

                <p className="mt-1 text-xl font-bold">
                  {statusCounts.Pending}
                </p>
              </button>


              <button
                type="button"
                onClick={() => setFilterStatus('Reviewed')}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  filterStatus === 'Reviewed'
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <p className="text-xs font-semibold text-purple-700">
                  Reviewed
                </p>

                <p className="mt-1 text-xl font-bold">
                  {statusCounts.Reviewed}
                </p>
              </button>


              <button
                type="button"
                onClick={() => setFilterStatus('Resolved')}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  filterStatus === 'Resolved'
                    ? 'border-green-400 bg-green-50'
                    : 'border-slate-200 hover:border-green-300'
                }`}
              >
                <p className="text-xs font-semibold text-green-700">
                  Resolved
                </p>

                <p className="mt-1 text-xl font-bold">
                  {statusCounts.Resolved}
                </p>
              </button>

            </div>

          </section>
        )}


        {/* LOADING */}
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">

            <p className="text-sm text-slate-500">
              Loading enquiries...
            </p>

          </div>

        ) : enquiries.length === 0 ? (

          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center sm:p-12">

            <h3 className="text-lg font-bold">
              No enquiries yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              New contact enquiries will appear here.
            </p>

          </div>

        ) : filteredEnquiries.length === 0 ? (

          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center sm:p-12">

            <h3 className="text-lg font-bold">
              No {filterStatus.toLowerCase()} enquiries
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no enquiries with this status.
            </p>

            <button
              type="button"
              onClick={() => setFilterStatus('All')}
              className="mt-5 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
            >
              Show all enquiries
            </button>

          </div>

        ) : (

          <div>

            {/* RESULTS COUNT */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm font-medium text-slate-500">
                Showing{' '}
                <span className="font-bold text-[#0B1F3A]">
                  {filteredEnquiries.length}
                </span>{' '}
                {filteredEnquiries.length === 1
                  ? 'enquiry'
                  : 'enquiries'}
              </p>

              {filterStatus !== 'All' && (
                <button
                  type="button"
                  onClick={() => setFilterStatus('All')}
                  className="text-left text-sm font-semibold text-[#2563EB] hover:text-[#0B1F3A] sm:text-right"
                >
                  Clear filter →
                </button>
              )}

            </div>


            {/* ENQUIRIES */}
            <div className="space-y-5">

              {filteredEnquiries.map((enquiry) => (

                <article
                  key={enquiry.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >

                  {/* TOP */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-bold">
                          {enquiry.subject}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            enquiry.status === 'New'
                              ? 'bg-blue-50 text-[#2563EB]'
                              : enquiry.status === 'Pending'
                                ? 'bg-yellow-50 text-yellow-700'
                                : enquiry.status === 'Reviewed'
                                  ? 'bg-purple-50 text-purple-700'
                                  : enquiry.status === 'Resolved'
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {enquiry.status}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        Received {formatDate(enquiry.created_at)}
                      </p>

                    </div>


                    {/* STATUS */}
                    <div className="w-full md:w-48">

                      <label
                        htmlFor={`status-${enquiry.id}`}
                        className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        Status
                      </label>

                      <select
                        id={`status-${enquiry.id}`}
                        value={enquiry.status}
                        disabled={updatingId === enquiry.id}
                        onChange={(event) =>
                          updateStatus(
                            enquiry.id,
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                      >
                        <option value="New">
                          New
                        </option>

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Reviewed">
                          Reviewed
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </div>

                  </div>


                  {/* DETAILS */}
                  <div className="mt-6 grid gap-5 border-t border-slate-100 pt-6 md:grid-cols-2">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                      </p>

                      <p className="mt-1 break-words text-sm font-medium text-[#0B1F3A]">
                        {enquiry.name}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </p>

                      <a
                        href={`mailto:${enquiry.email}`}
                        className="mt-1 block break-all text-sm font-medium text-[#2563EB] hover:text-[#0B1F3A]"
                      >
                        {enquiry.email}
                      </a>

                    </div>

                  </div>


                  {/* MESSAGE */}
                  <div className="mt-6 border-t border-slate-100 pt-6">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Message
                    </p>

                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                      {enquiry.message}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          </div>
        )}

      </main>

    </div>
  )
}

export default AdminEnquiries