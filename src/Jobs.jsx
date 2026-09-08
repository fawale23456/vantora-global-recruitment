import { useEffect, useMemo, useState } from 'react'
import { supabase } from './supabase.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const formatDate = (dateValue) => {
  if (!dateValue) return 'Recently posted'

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Recently posted'
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const parseList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
  }

  return String(value || '')
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
}

const normalizeJob = (job) => ({
  ...job,
  workplace: job.workplace || '',
  posted: job.posted || formatDate(job.created_at),
  department: job.department || job.sector || '',
  responsibilities: parseList(job.responsibilities),
  requirements: parseList(job.requirements),
})

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return {
      firstName: '',
      lastName: '',
    }
  }

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: '',
    }
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

const createSafeFileName = (fileName) => {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
}

const generateUniqueId = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < 20; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length),
    )
  }

  return result
}

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplication, setShowApplication] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [applicationError, setApplicationError] = useState('')

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    if (!selectedJob) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDrawer()
      }
    }

    document.addEventListener('keydown', handleEscape)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedJob])

  const loadJobs = async () => {
    setLoadingJobs(true)
    setLoadError('')

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading jobs:', error)

      setLoadError(
        `Jobs database error: ${error.message || 'Unknown error'}`,
      )

      setJobs([])
    } else {
      setJobs((data || []).map(normalizeJob))
    }

    setLoadingJobs(false)
  }

  const locationOptions = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.location)
          .filter(Boolean),
      ),
    ].sort()
  }, [jobs])

  const typeOptions = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.type)
          .filter(Boolean),
      ),
    ].sort()
  }, [jobs])

  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    return jobs.filter((job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.department,
        job.sector,
        job.type,
        job.salary,
        job.description,
        job.requirements?.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !search || searchableText.includes(search)

      const matchesLocation =
        !locationFilter || job.location === locationFilter

      const matchesType =
        !typeFilter || job.type === typeFilter

      return matchesSearch && matchesLocation && matchesType
    })
  }, [jobs, searchTerm, locationFilter, typeFilter])

  const openJob = (job) => {
    setSelectedJob(job)
    setShowApplication(false)
    setSubmitted(false)
    setApplicationError('')
  }

  const closeDrawer = () => {
    setSelectedJob(null)
    setShowApplication(false)
    setSubmitted(false)
    setApplicationError('')
    setSubmitting(false)
  }

  const openApplication = () => {
    setShowApplication(true)
    setSubmitted(false)
    setApplicationError('')
  }

  const goBackToJob = () => {
    setShowApplication(false)
    setSubmitted(false)
    setApplicationError('')
  }

  const handleApplicationSubmit = async (event) => {
    event.preventDefault()

    if (!selectedJob) return

    setSubmitting(true)
    setApplicationError('')
    setSubmitted(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    const fullName = String(formData.get('fullName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const location = String(formData.get('location') || '').trim()
    const education = String(formData.get('education') || '').trim()
    const experience = String(formData.get('experience') || '').trim()
    const linkedin = String(formData.get('linkedin') || '').trim()
    const coverLetter = String(formData.get('coverLetter') || '').trim()

    const cv = formData.get('cv')

    if (!fullName || !email || !phone || !location || !cv) {
      setApplicationError(
        'Please complete all required fields and upload your CV.',
      )
      setSubmitting(false)
      return
    }

    if (!(cv instanceof File) || cv.size === 0) {
      setApplicationError('Please select a valid CV file.')
      setSubmitting(false)
      return
    }

    const maxFileSize = 5 * 1024 * 1024

    if (cv.size > maxFileSize) {
      setApplicationError('Your CV must not be larger than 5MB.')
      setSubmitting(false)
      return
    }

    const allowedExtensions = ['pdf', 'doc', 'docx']
    const extension = cv.name.split('.').pop()?.toLowerCase()

    if (!extension || !allowedExtensions.includes(extension)) {
      setApplicationError(
        'Please upload your CV as a PDF, DOC or DOCX file.',
      )
      setSubmitting(false)
      return
    }

    const { firstName, lastName } = splitFullName(fullName)

    let uploadedFilePath = null

    try {
      const safeFileName = createSafeFileName(cv.name)

      const uniqueFileName = `${Date.now()}-${generateUniqueId()}-${safeFileName}`

      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(uniqueFileName, cv, {
          upsert: false,
          contentType: cv.type || undefined,
        })

      if (uploadError) {
        console.error('CV upload error:', uploadError)

        throw new Error(
          'We could not upload your CV. Please try again.',
        )
      }

      uploadedFilePath = uniqueFileName

      const applicationData = {
        first_name: firstName,
        last_name: lastName,
        job_title: selectedJob.title,
        status: 'New',
        email,
        phone,
        location,
        years_experience: experience,
        linkedin_url: linkedin,
        professional_summary: education,
        cover_letter: coverLetter,
        cv_url: uploadedFilePath,
      }

      const { error: insertError } = await supabase
        .from('Applications')
        .insert([applicationData])

      if (insertError) {
        console.error('Application insert error:', insertError)

        if (uploadedFilePath) {
          await supabase.storage
            .from('cvs')
            .remove([uploadedFilePath])
        }

        throw new Error(
          'We could not submit your application. Please try again.',
        )
      }

      setSubmitted(true)
      form.reset()
    } catch (error) {
      console.error('Application submission error:', error)

      setApplicationError(
        error?.message ||
          'Something went wrong while submitting your application. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      <Header />

      {/* JOBS BANNER */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7691726/pexels-photo-7691726.jpeg?cs=srgb&dl=pexels-yankrukov-7691726.jpg&fm=jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#0B1F3A]/65" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
              Career Opportunities
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find your next opportunity.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Explore current vacancies and discover opportunities that match
              your skills, experience and career ambitions.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="relative z-10 -mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">

            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr_auto]">

              <div>
                <label
                  htmlFor="job-search"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Search jobs
                </label>

                <input
                  id="job-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Job title, sector or keyword"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="location-filter"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Location
                </label>

                <select
                  id="location-filter"
                  value={locationFilter}
                  onChange={(event) =>
                    setLocationFilter(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="">All locations</option>

                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="type-filter"
                  className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                >
                  Job type
                </label>

                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="">All job types</option>

                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('')
                    setLocationFilter('')
                    setTypeFilter('')
                  }}
                  className="w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#2563EB] hover:text-[#2563EB] lg:w-auto"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* JOB LIST */}
      <main className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                Current Vacancies
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                Explore available opportunities.
              </h2>
            </div>

            {!loadingJobs && (
              <p className="text-sm text-slate-500">
                {filteredJobs.length}{' '}
                {filteredJobs.length === 1
                  ? 'position'
                  : 'positions'}
              </p>
            )}
          </div>

          {loadingJobs && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#2563EB]" />

              <p className="mt-4 text-sm text-slate-600">
                Loading current vacancies...
              </p>
            </div>
          )}

          {!loadingJobs && loadError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-700">
                {loadError}
              </p>

              <button
                type="button"
                onClick={loadJobs}
                className="mt-5 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
              >
                Try Again
              </button>
            </div>
          )}

          {!loadingJobs &&
            !loadError &&
            filteredJobs.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">

                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  No matching vacancies found.
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Try changing your search or filters to see more
                  opportunities.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('')
                    setLocationFilter('')
                    setTypeFilter('')
                  }}
                  className="mt-5 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
                >
                  View All Jobs
                </button>

              </div>
            )}

          {!loadingJobs &&
            !loadError &&
            filteredJobs.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredJobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => openJob(job)}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:shadow-xl"
                  >

                    {/* TOP ROW — DATE ONLY */}
                    <div className="flex items-start justify-end">
                      <span className="text-xs text-slate-500">
                        {job.posted}
                      </span>
                    </div>

                    {/* JOB TITLE */}
                    <h3 className="mt-5 text-xl font-bold text-[#0B1F3A] transition group-hover:text-[#2563EB]">
                      {job.title}
                    </h3>

                    {/* COMPANY */}
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {job.company || 'Vantora Global Recruitment'}
                    </p>

                    {/* JOB DETAILS */}
                    <div className="mt-5 space-y-2 text-sm text-slate-600">

                      {job.location && (
                        <p>
                          <span className="font-semibold text-[#0B1F3A]">
                            Location:
                          </span>{' '}
                          {job.location}
                        </p>
                      )}

                      {job.department && (
                        <p>
                          <span className="font-semibold text-[#0B1F3A]">
                            Department:
                          </span>{' '}
                          {job.department}
                        </p>
                      )}

                      {job.type && (
                        <p>
                          <span className="font-semibold text-[#0B1F3A]">
                            Type:
                          </span>{' '}
                          {job.type}
                        </p>
                      )}

                      {job.salary && (
                        <p>
                          <span className="font-semibold text-[#0B1F3A]">
                            Salary:
                          </span>{' '}
                          {job.salary}
                        </p>
                      )}

                    </div>

                    {/* VIEW POSITION */}
                    <div className="mt-auto pt-7">
                      <span className="inline-flex items-center text-sm font-semibold text-[#2563EB]">
                        View position

                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>

                  </button>
                ))}

              </div>
            )}

        </div>
      </main>

      <Footer />

      {/* DARK BACKDROP */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeDrawer}
        />
      )}

      {/* RIGHT-SIDE DRAWER */}
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full max-w-2xl transform bg-white shadow-2xl transition-transform duration-300 ${
          selectedJob
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
        aria-hidden={!selectedJob}
      >

        {selectedJob && (
          <div className="flex h-full flex-col">

            {/* DRAWER HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
                  {showApplication
                    ? 'Application'
                    : 'Job Details'}
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-[#0B1F3A]">
                  {selectedJob.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close"
                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-2xl leading-none text-slate-500 transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                ×
              </button>

            </div>

            {/* DRAWER CONTENT */}
            <div className="flex-1 overflow-y-auto">

              {!showApplication && !submitted && (
                <div className="p-5 sm:p-7">

                  <div className="rounded-2xl bg-[#0B1F3A] p-6 text-white">

                    <p className="text-sm font-medium text-[#38BDF8]">
                      {selectedJob.company ||
                        'Vantora Global Recruitment'}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {selectedJob.title}
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                      {selectedJob.location && (
                        <div>
                          <p className="text-xs text-slate-400">
                            Location
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {selectedJob.location}
                          </p>
                        </div>
                      )}

                      {selectedJob.department && (
                        <div>
                          <p className="text-xs text-slate-400">
                            Department
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {selectedJob.department}
                          </p>
                        </div>
                      )}

                      {selectedJob.type && (
                        <div>
                          <p className="text-xs text-slate-400">
                            Job Type
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {selectedJob.type}
                          </p>
                        </div>
                      )}

                      {selectedJob.salary && (
                        <div>
                          <p className="text-xs text-slate-400">
                            Salary
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {selectedJob.salary}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>

                  {selectedJob.description && (
                    <section className="mt-8">

                      <h3 className="text-lg font-bold text-[#0B1F3A]">
                        Job Description
                      </h3>

                      <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {selectedJob.description}
                      </div>

                    </section>
                  )}

                  {selectedJob.responsibilities.length > 0 && (
                    <section className="mt-8">

                      <h3 className="text-lg font-bold text-[#0B1F3A]">
                        Responsibilities
                      </h3>

                      <ul className="mt-4 space-y-3">

                        {selectedJob.responsibilities.map(
                          (responsibility, index) => (
                            <li
                              key={`${responsibility}-${index}`}
                              className="flex gap-3 text-sm leading-6 text-slate-600"
                            >

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" />

                              <span>
                                {responsibility}
                              </span>

                            </li>
                          ),
                        )}

                      </ul>

                    </section>
                  )}

                  {selectedJob.requirements.length > 0 && (
                    <section className="mt-8">

                      <h3 className="text-lg font-bold text-[#0B1F3A]">
                        Requirements
                      </h3>

                      <ul className="mt-4 space-y-3">

                        {selectedJob.requirements.map(
                          (requirement, index) => (
                            <li
                              key={`${requirement}-${index}`}
                              className="flex gap-3 text-sm leading-6 text-slate-600"
                            >

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#38BDF8]" />

                              <span>
                                {requirement}
                              </span>

                            </li>
                          ),
                        )}

                      </ul>

                    </section>
                  )}

                  <div className="mt-10">

                    <button
                      type="button"
                      onClick={openApplication}
                      className="w-full rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
                    >
                      Apply for this position
                    </button>

                  </div>

                </div>
              )}

              {showApplication && !submitted && (
                <form
                  onSubmit={handleApplicationSubmit}
                  className="p-5 sm:p-7"
                >

                  <div className="mb-7 rounded-xl bg-slate-50 p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                      Applying for
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#0B1F3A]">
                      {selectedJob.title}
                    </p>

                  </div>

                  {applicationError && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {applicationError}
                    </div>
                  )}

                  <div className="space-y-7">

                    <section>

                      <h3 className="text-base font-bold text-[#0B1F3A]">
                        Personal Information
                      </h3>

                      <div className="mt-4 grid gap-5">

                        <div>

                          <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            Full Name *
                          </label>

                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                          />

                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                          <div>

                            <label
                              htmlFor="email"
                              className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                            >
                              Email Address *
                            </label>

                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              placeholder="you@example.com"
                              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                            />

                          </div>

                          <div>

                            <label
                              htmlFor="phone"
                              className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                            >
                              Phone Number *
                            </label>

                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              placeholder="0800 000 0000"
                              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                            />

                          </div>

                        </div>

                        <div>

                          <label
                            htmlFor="location"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            Current Location *
                          </label>

                          <input
                            id="location"
                            name="location"
                            type="text"
                            required
                            placeholder="City, State, Country"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                          />

                        </div>

                      </div>

                    </section>

                    <section>

                      <h3 className="text-base font-bold text-[#0B1F3A]">
                        Professional Information
                      </h3>

                      <div className="mt-4 grid gap-5">

                        <div>

                          <label
                            htmlFor="education"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            Highest Qualification
                          </label>

                          <input
                            id="education"
                            name="education"
                            type="text"
                            placeholder="e.g. B.Sc. Civil Engineering"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                          />

                        </div>

                        <div>

                          <label
                            htmlFor="experience"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            Years of Experience
                          </label>

                          <input
                            id="experience"
                            name="experience"
                            type="text"
                            placeholder="e.g. 3 years"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                          />

                        </div>

                        <div>

                          <label
                            htmlFor="linkedin"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            LinkedIn Profile
                          </label>

                          <input
                            id="linkedin"
                            name="linkedin"
                            type="url"
                            placeholder="https://linkedin.com/in/yourname"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                          />

                        </div>

                        <div>

                          <label
                            htmlFor="cv"
                            className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                          >
                            CV / Resume *
                          </label>

                          <input
                            id="cv"
                            name="cv"
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#2563EB] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                          />

                          <p className="mt-2 text-xs text-slate-500">
                            Accepted formats: PDF, DOC, DOCX. Maximum size:
                            5MB.
                          </p>

                        </div>

                      </div>

                    </section>

                    <section>

                      <h3 className="text-base font-bold text-[#0B1F3A]">
                        Cover Letter
                      </h3>

                      <div className="mt-4">

                        <label
                          htmlFor="coverLetter"
                          className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                        >
                          Message
                        </label>

                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows="7"
                          placeholder="Tell us briefly why you are a good fit for this position..."
                          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                        />

                      </div>

                    </section>

                    <div className="rounded-lg bg-slate-50 p-4">

                      <label className="flex items-start gap-3">

                        <input
                          type="checkbox"
                          required
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                        />

                        <span className="text-xs leading-5 text-slate-600">
                          I confirm that the information provided in this
                          application is accurate and I consent to Vantora
                          Global Recruitment processing my information for
                          recruitment purposes.
                        </span>

                      </label>

                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">

                      <button
                        type="button"
                        onClick={goBackToJob}
                        disabled={submitting}
                        className="rounded-lg border border-slate-300 px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back to Job
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting
                          ? 'Submitting Application...'
                          : 'Submit Application'}
                      </button>

                    </div>

                  </div>

                </form>
              )}

              {submitted && (
                <div className="flex min-h-full items-center justify-center p-6 sm:p-10">

                  <div className="w-full max-w-md text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <span className="text-3xl text-green-600">
                        ✓
                      </span>
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                      Application Received
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-[#0B1F3A]">
                      Thank you for applying.
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      Your application for{' '}
                      <strong>{selectedJob.title}</strong> has been
                      successfully submitted. Our recruitment team will
                      review your application and contact you if your
                      profile matches the opportunity.
                    </p>

                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="mt-8 w-full rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
                    >
                      Close
                    </button>

                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </aside>

    </div>
  )
}

export default Jobs