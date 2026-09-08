import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from './supabase.js'

function JobDetails() {
  const { jobTitle } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadJob()
  }, [jobTitle])

  async function loadJob() {
    setLoading(true)
    setError('')

    const decodedTitle = jobTitle
      ? decodeURIComponent(jobTitle)
      : ''

    const { data, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('title', decodedTitle)
      .maybeSingle()

    if (jobError) {
      console.error(jobError)
      setError(jobError.message)
      setJob(null)
    } else {
      setJob(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading job...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Unable to load job
          </h1>

          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Job not found
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            The vacancy you are looking for may have been removed.
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ← View all jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="block shrink-0"
          >
            <h1 className="text-xl font-bold tracking-wide">
              VANTORA
            </h1>

            <p className="text-[10px] tracking-[0.2em] text-[#2563EB] sm:text-xs">
              GLOBAL RECRUITMENT
            </p>
          </Link>

          <Link
            to="/jobs"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            ← All Jobs
          </Link>

        </div>

      </header>


      {/* HERO */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              {job.sector || 'Career Opportunity'}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#0B1F3A] sm:text-4xl lg:text-5xl">
              {job.title}
            </h1>

            <p className="mt-4 text-lg font-medium text-slate-700">
              {job.company || 'Vantora Global Recruitment'}
            </p>

          </div>


          {/* JOB META */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <JobMeta
              label="Location"
              value={job.location}
              icon={
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              }
            />

            <JobMeta
              label="Job Type"
              value={job.type}
              icon={
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="7"
                    width="18"
                    height="13"
                    rx="2"
                  />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M3 12h18" />
                </svg>
              }
            />

            <JobMeta
              label="Sector"
              value={job.sector}
              icon={
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
                  <path d="M2 21h20" />
                  <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
                </svg>
              }
            />

            <JobMeta
              label="Salary"
              value={job.salary}
              icon={
                <svg
                  className="h-7 w-7"
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
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                  />
                  <path d="M7 9h.01M17 15h.01" />
                </svg>
              }
            />

          </div>

        </div>

      </section>


      {/* CONTENT */}
      <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* MAIN CONTENT */}
          <div className="min-w-0">

            {/* DESCRIPTION */}
            <section>

              <h2 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
                Job Description
              </h2>

              {job.description ? (
                <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                  {job.description}
                </div>
              ) : (
                <p className="mt-5 text-base leading-7 text-slate-500">
                  Please contact Vantora Global Recruitment for further
                  information about this opportunity.
                </p>
              )}

            </section>


            {/* REQUIREMENTS */}
            <section className="mt-12 border-t border-slate-200 pt-10">

              <h2 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
                Requirements
              </h2>

              {job.requirements ? (
                <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                  {job.requirements}
                </div>
              ) : (
                <p className="mt-5 text-base leading-7 text-slate-500">
                  Requirements for this position will be discussed during
                  the recruitment process.
                </p>
              )}

            </section>

          </div>


          {/* APPLY CARD */}
          <aside className="lg:sticky lg:top-8 lg:self-start">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
                Interested in this role?
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#0B1F3A]">
                Apply for this position
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Submit your application and CV to be considered for this
                opportunity.
              </p>

              <Link
                to={`/apply/${encodeURIComponent(job.title)}`}
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
              >
                Apply Now
              </Link>

              <Link
                to="/jobs"
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-[#2563EB]"
              >
                View Other Jobs
              </Link>

            </div>

          </aside>

        </div>

      </main>


      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] px-6 py-14 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

            {/* BRAND */}
            <div>

              <h3 className="text-lg font-bold tracking-wide">
                VANTORA GLOBAL RECRUITMENT
              </h3>

              <p className="mt-5 leading-7 text-[#D4A72C]">
                Connecting the right people with the right roles.
              </p>

            </div>


            {/* QUICK LINKS */}
            <div>

              <h4 className="font-semibold text-[#D4A72C]">
                Quick Links
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">

                <Link to="/" className="hover:text-white">
                  Home
                </Link>

                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>

                <Link to="/jobs" className="hover:text-white">
                  Jobs
                </Link>

                <Link to="/services" className="hover:text-white">
                  Services
                </Link>

                <Link to="/reviews" className="hover:text-white">
                  Reviews
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>

              </div>

            </div>


            {/* FOR CANDIDATES */}
            <div>

              <h4 className="font-semibold text-[#D4A72C]">
                For Candidates
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">

                <Link to="/jobs" className="hover:text-white">
                  Find Jobs
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Submit Your CV
                </Link>

                <Link to="/services" className="hover:text-white">
                  Career Support
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Candidates FAQs
                </Link>

              </div>

            </div>


            {/* FOR EMPLOYERS */}
            <div>

              <h4 className="font-semibold text-[#D4A72C]">
                For Employers
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">

                <Link to="/contact" className="hover:text-white">
                  Find Talent
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Submit Vacancy
                </Link>

                <Link to="/services" className="hover:text-white">
                  Recruitment Services
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Employer FAQs
                </Link>

              </div>

            </div>


            {/* GET IN TOUCH */}
            <div>

              <h4 className="font-semibold text-[#D4A72C]">
                Get In Touch
              </h4>

              <div className="mt-5 space-y-6 text-sm text-slate-300">

                {/* EMAIL */}
                <div className="flex items-start gap-3">

                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D4A72C]"
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

                  <a
                    href="mailto:info@vantoraglobalrecruitment.com"
                    className="break-all hover:text-white"
                  >
                    info@vantoraglobalrecruitment.com
                  </a>

                </div>


                {/* BUSINESS HOURS */}
                <div className="flex items-start gap-3">

                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D4A72C]"
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

                  <div>

                    <p className="font-medium text-white">
                      Business Hours
                    </p>

                    <p className="mt-1 leading-6 text-slate-300">
                      Monday - Friday:
                      <br />
                      9:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* FOOTER BOTTOM */}
          <div className="mt-12 border-t border-white/10 pt-7 text-center">

            <p className="text-sm text-slate-400">
              © 2026 Vantora Global Recruitment. All rights reserved.
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-400">

              <Link
                to="/privacy-policy"
                className="hover:text-white"
              >
                Privacy Policy
              </Link>

              <span>·</span>

              <Link
                to="/terms"
                className="hover:text-white"
              >
                Terms & Conditions
              </Link>

              <span>·</span>

              <Link
                to="/cookies"
                className="hover:text-white"
              >
                Cookie Policy
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </div>
  )
}


function JobMeta({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex flex-col items-center text-center">

        {/* GOLD ICON */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A72C]/10 text-[#D4A72C]">

          {icon}

        </div>

        {/* LABEL */}
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
          {label}
        </p>

        {/* VALUE */}
        <p className="mt-2 break-words text-sm font-semibold text-slate-900">
          {value || '—'}
        </p>

      </div>

    </div>
  )
}


export default JobDetails