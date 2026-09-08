import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from './supabase.js'

const STATUS_OPTIONS = [
  'New',
  'Pending',
  'Reviewed',
  'Hired',
  'Rejected',
]

function AdminApplications() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialStatus = searchParams.get('status')
  const validInitialStatus =
    initialStatus && STATUS_OPTIONS.includes(initialStatus)
      ? initialStatus
      : 'All'

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cvUrl, setCvUrl] = useState('')
  const [cvLoading, setCvLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [statusFilter, setStatusFilter] = useState(validInitialStatus)

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    const urlStatus = searchParams.get('status')

    if (urlStatus && STATUS_OPTIONS.includes(urlStatus)) {
      setStatusFilter(urlStatus)
    } else {
      setStatusFilter('All')
    }
  }, [searchParams])

  async function loadApplications() {
    setLoading(true)
    setError('')

    const { data, error: applicationsError } = await supabase
      .from('Applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (applicationsError) {
      console.error(applicationsError)
      setError(applicationsError.message)
      setApplications([])
    } else {
      setApplications(data || [])
    }

    setLoading(false)
  }

  async function updateStatus(applicationId, newStatus) {
    setUpdatingId(applicationId)
    setError('')

    const { error: updateError } = await supabase
      .from('Applications')
      .update({
        status: newStatus,
      })
      .eq('id', applicationId)

    if (updateError) {
      console.error(updateError)
      setError(updateError.message)
      setUpdatingId(null)
      return
    }

    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status: newStatus,
            }
          : application,
      ),
    )

    setUpdatingId(null)
  }

  async function viewCv(filePath) {
    if (!filePath) return

    setCvLoading(true)
    setError('')

    const { data, error: downloadError } = await supabase.storage
      .from('cvs')
      .download(filePath)

    if (downloadError) {
      console.error(downloadError)
      setError(downloadError.message)
      setCvLoading(false)
      return
    }

    const temporaryUrl = URL.createObjectURL(data)

    setCvUrl(temporaryUrl)
    setCvLoading(false)
  }

  function closeCv() {
    if (cvUrl) {
      URL.revokeObjectURL(cvUrl)
    }

    setCvUrl('')
  }

  function changeFilter(newFilter) {
    setStatusFilter(newFilter)

    if (newFilter === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ status: newFilter })
    }
  }

  function getStatusClasses(status) {
    switch (status) {
      case 'New':
        return 'border-blue-200 bg-blue-50 text-blue-700'

      case 'Pending':
        return 'border-amber-200 bg-amber-50 text-amber-700'

      case 'Reviewed':
        return 'border-purple-200 bg-purple-50 text-purple-700'

      case 'Hired':
        return 'border-green-200 bg-green-50 text-green-700'

      case 'Rejected':
        return 'border-red-200 bg-red-50 text-red-700'

      default:
        return 'border-slate-200 bg-slate-50 text-slate-700'
    }
  }

  const statusCounts = {
    Total: applications.length,

    New: applications.filter(
      (application) => (application.status || 'New') === 'New',
    ).length,

    Pending: applications.filter(
      (application) => application.status === 'Pending',
    ).length,

    Reviewed: applications.filter(
      (application) => application.status === 'Reviewed',
    ).length,

    Hired: applications.filter(
      (application) => application.status === 'Hired',
    ).length,

    Rejected: applications.filter(
      (application) => application.status === 'Rejected',
    ).length,
  }

  const filteredApplications =
    statusFilter === 'All'
      ? applications
      : applications.filter(
          (application) =>
            (application.status || 'New') === statusFilter,
        )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Vantora Global Recruitment
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Applications
            </h1>
          </div>

          <Link
            to="/admin"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            ← Dashboard
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Candidate Applications
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Review candidate information, preview CVs, and manage
            application status.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUMMARY CARDS */}
        {!loading && applications.length > 0 && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            <button
              type="button"
              onClick={() => changeFilter('All')}
              className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
                statusFilter === 'All'
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-slate-200 hover:border-blue-200'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {statusCounts.Total}
              </p>
            </button>

            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => changeFilter(status)}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
                  statusFilter === status
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-blue-200'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {status}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {statusCounts[status]}
                </p>
              </button>
            ))}

          </div>
        )}

        {/* FILTER BAR */}
        {!loading && applications.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Showing:{' '}
                {statusFilter === 'All'
                  ? 'All applications'
                  : statusFilter}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {filteredApplications.length} application
                {filteredApplications.length === 1 ? '' : 's'} found
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                changeFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All statuses
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading applications...
            </p>

          </div>
        ) : applications.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              No applications found.
            </p>
          </div>

        ) : filteredApplications.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

            <p className="text-sm font-medium text-slate-700">
              No applications have this status yet.
            </p>

            <button
              type="button"
              onClick={() => changeFilter('All')}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Show all applications
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {filteredApplications.map((application) => {

              /*
               * IMPORTANT:
               * Apply.jsx saves the candidate's complete name
               * in the "full_name" column.
               */
              const fullName =
                application.full_name?.trim() || 'Unnamed Candidate'

              const currentStatus =
                application.status || 'New'

              return (
                <div
                  key={application.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  <div className="p-5 sm:p-6">

                    {/* TOP SECTION */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      {/* CANDIDATE NAME */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {fullName}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {application.job_title || 'No job title'}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div className="w-full lg:w-auto">

                        <label
                          htmlFor={`status-${application.id}`}
                          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          Application status
                        </label>

                        <select
                          id={`status-${application.id}`}
                          value={currentStatus}
                          disabled={
                            updatingId === application.id
                          }
                          onChange={(event) =>
                            updateStatus(
                              application.id,
                              event.target.value,
                            )
                          }
                          className={`w-full rounded-lg border px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:min-w-40 ${getStatusClasses(
                            currentStatus,
                          )}`}
                        >

                          {STATUS_OPTIONS.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}

                        </select>

                        {updatingId === application.id && (
                          <p className="mt-2 text-xs text-slate-500">
                            Saving status...
                          </p>
                        )}

                      </div>

                    </div>

                    {/* BASIC INFORMATION */}
                    <div className="mt-6 border-t border-slate-100 pt-5">

                      <h4 className="text-sm font-semibold text-slate-900">
                        Candidate Information
                      </h4>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* EMAIL */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Email
                          </p>

                          <p className="mt-1 break-words text-sm text-slate-700">
                            {application.email || '—'}
                          </p>
                        </div>

                        {/* PHONE */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Phone
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {application.phone || '—'}
                          </p>
                        </div>

                        {/* LOCATION */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Current Location
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {application.location || '—'}
                          </p>
                        </div>

                        {/* EXPERIENCE */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Years of Experience
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {application.years_of_experience || '—'}
                          </p>
                        </div>

                        {/* LINKEDIN */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            LinkedIn
                          </p>

                          {application.linkedin ? (
                            <a
                              href={application.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 block break-all text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                              View LinkedIn Profile →
                            </a>
                          ) : (
                            <p className="mt-1 text-sm text-slate-700">
                              —
                            </p>
                          )}
                        </div>

                        {/* APPLICATION DATE */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Applied
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {application.created_at
                              ? new Date(
                                  application.created_at,
                                ).toLocaleDateString()
                              : '—'}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* PROFESSIONAL SUMMARY */}
                    {application.professional_summary && (
                      <div className="mt-6 border-t border-slate-100 pt-5">

                        <h4 className="text-sm font-semibold text-slate-900">
                          Professional Summary
                        </h4>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {application.professional_summary}
                        </p>

                      </div>
                    )}

                    {/* COVER LETTER */}
                    {application.cover_letter && (
                      <div className="mt-6 border-t border-slate-100 pt-5">

                        <h4 className="text-sm font-semibold text-slate-900">
                          Cover Letter
                        </h4>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {application.cover_letter}
                        </p>

                      </div>
                    )}

                    {/* CV */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">

                      {application.cv_url ? (

                        <button
                          type="button"
                          onClick={() =>
                            viewCv(application.cv_url)
                          }
                          disabled={cvLoading}
                          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {cvLoading
                            ? 'Opening CV...'
                            : 'View CV'}
                        </button>

                      ) : (

                        <span className="rounded-lg bg-slate-100 px-4 py-2.5 text-center text-sm font-medium text-slate-500">
                          No CV attached
                        </span>

                      )}

                    </div>

                  </div>

                </div>
              )
            })}

          </div>
        )}

      </main>

      {/* CV PREVIEW */}
      {cvUrl && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 p-3 sm:p-6">

          <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Candidate CV
                </h2>

                <p className="text-xs text-slate-500">
                  CV preview
                </p>
              </div>

              <button
                type="button"
                onClick={closeCv}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Close CV
              </button>

            </div>

            <div className="min-h-0 flex-1 bg-slate-100">

              <iframe
                src={cvUrl}
                title="Candidate CV"
                className="h-full w-full"
              />

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default AdminApplications