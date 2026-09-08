import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'

function Admin() {
  const navigate = useNavigate()

  const [jobCount, setJobCount] = useState(0)
  const [applicationCount, setApplicationCount] = useState(0)
  const [enquiryCount, setEnquiryCount] = useState(0)
  const [testimonialCount, setTestimonialCount] = useState(0)

  const [statusCounts, setStatusCounts] = useState({
    New: 0,
    Pending: 0,
    Reviewed: 0,
    Hired: 0,
    Rejected: 0,
  })

  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true)

      const [
        { count: jobsCount, error: jobsError },
        { data: applications, error: applicationsError },
        { count: enquiriesCount, error: enquiriesError },
        { count: testimonialsCount, error: testimonialsError },
      ] = await Promise.all([
        supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('Applications')
          .select('status'),

        supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending'),
      ])

      if (jobsError) {
        console.error('Error loading job count:', jobsError)
        setJobCount(0)
      } else {
        setJobCount(jobsCount || 0)
      }

      if (applicationsError) {
        console.error('Error loading applications:', applicationsError)

        setApplicationCount(0)

        setStatusCounts({
          New: 0,
          Pending: 0,
          Reviewed: 0,
          Hired: 0,
          Rejected: 0,
        })
      } else {
        const applicationList = applications || []

        setApplicationCount(applicationList.length)

        setStatusCounts({
          New: applicationList.filter(
            (application) => (application.status || 'New') === 'New'
          ).length,

          Pending: applicationList.filter(
            (application) => application.status === 'Pending'
          ).length,

          Reviewed: applicationList.filter(
            (application) => application.status === 'Reviewed'
          ).length,

          Hired: applicationList.filter(
            (application) => application.status === 'Hired'
          ).length,

          Rejected: applicationList.filter(
            (application) => application.status === 'Rejected'
          ).length,
        })
      }

      if (enquiriesError) {
        console.error('Error loading enquiries:', enquiriesError)
        setEnquiryCount(0)
      } else {
        setEnquiryCount(enquiriesCount || 0)
      }

      if (testimonialsError) {
        console.error('Error loading testimonial count:', testimonialsError)
        setTestimonialCount(0)
      } else {
        setTestimonialCount(testimonialsCount || 0)
      }

      setLoading(false)
    }

    loadDashboardData()
  }, [])

  async function handleLogout() {
    setLoggingOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out:', error)
      setLoggingOut(false)
      return
    }

    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] text-[#1A1816]">

      {/* HEADER */}
      <header className="border-b border-[#E8E4DF] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">

          <Link to="/" className="block shrink-0">
            <h1 className="text-xl font-bold tracking-wide text-[#1A1816]">
              VANTORA
            </h1>

            <p className="text-[10px] font-medium tracking-[0.2em] text-[#E45128] sm:text-xs">
              GLOBAL RECRUITMENT
            </p>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[#E45128] transition hover:bg-[#FFF0EB] hover:text-[#1A1816] sm:px-4"
            >
              View Website
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg bg-[#1A1816] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#E45128] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* INTRO */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E45128]">
              Administration
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#1A1816] sm:text-4xl">
              Vantora Admin Dashboard
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-[#6B6560]">
              Manage vacancies, applications, enquiries and recruitment
              activity from one place.
            </p>

          </div>

          {/* STAT CARDS */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/admin/jobs"
              className="group rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#E45128] hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#756F69]">
                Active Jobs
              </p>

              <p className="mt-3 text-4xl font-bold text-[#1A1816]">
                {loading ? '...' : jobCount}
              </p>

              <p className="mt-5 text-sm font-semibold text-[#E45128] group-hover:text-[#1A1816]">
                Manage jobs →
              </p>
            </Link>

            <Link
              to="/admin/applications"
              className="group rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#E45128] hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#756F69]">
                Applications
              </p>

              <p className="mt-3 text-4xl font-bold text-[#1A1816]">
                {loading ? '...' : applicationCount}
              </p>

              <p className="mt-5 text-sm font-semibold text-[#E45128] group-hover:text-[#1A1816]">
                View applications →
              </p>
            </Link>

            <Link
              to="/admin/enquiries"
              className="group rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#E45128] hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#756F69]">
                Enquiries
              </p>

              <p className="mt-3 text-4xl font-bold text-[#1A1816]">
                {loading ? '...' : enquiryCount}
              </p>

              <p className="mt-5 text-sm font-semibold text-[#E45128] group-hover:text-[#1A1816]">
                View enquiries →
              </p>
            </Link>

            <Link
              to="/admin/testimonials"
              className="group rounded-2xl border border-[#F1C9BD] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#E45128] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-sm font-medium text-[#756F69]">
                    Pending Testimonials
                  </p>

                  <p className="mt-3 text-4xl font-bold text-[#1A1816]">
                    {loading ? '...' : testimonialCount}
                  </p>
                </div>

                <span className="rounded-full bg-[#FFF0EB] px-2.5 py-1 text-xs font-semibold text-[#E45128]">
                  Reviews
                </span>

              </div>

              <p className="mt-5 text-sm font-semibold text-[#E45128] group-hover:text-[#1A1816]">
                Review testimonials →
              </p>
            </Link>

          </div>

          {/* APPLICATION OVERVIEW */}
          <section className="mt-10">

            <h2 className="text-2xl font-bold text-[#1A1816]">
              Application Overview
            </h2>

            <p className="mt-2 text-sm text-[#756F69]">
              Track candidates through the recruitment process.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

              {[
                {
                  name: 'New',
                  count: statusCounts.New,
                  border: 'border-[#F1C9BD]',
                  bg: 'bg-[#FFF7F4]',
                  text: 'text-[#E45128]',
                },
                {
                  name: 'Pending',
                  count: statusCounts.Pending,
                  border: 'border-[#E8E4DF]',
                  bg: 'bg-[#FAF9F7]',
                  text: 'text-[#6B6560]',
                },
                {
                  name: 'Reviewed',
                  count: statusCounts.Reviewed,
                  border: 'border-[#E8E4DF]',
                  bg: 'bg-[#FAF9F7]',
                  text: 'text-[#6B6560]',
                },
                {
                  name: 'Hired',
                  count: statusCounts.Hired,
                  border: 'border-[#D8E5D8]',
                  bg: 'bg-[#F5FAF5]',
                  text: 'text-[#397A3C]',
                },
                {
                  name: 'Rejected',
                  count: statusCounts.Rejected,
                  border: 'border-[#E7D0CB]',
                  bg: 'bg-[#FAF6F5]',
                  text: 'text-[#9A4A3A]',
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={`/admin/applications?status=${item.name}`}
                  className={`group rounded-2xl border ${item.border} ${item.bg} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
                >

                  <p className={`text-sm font-semibold ${item.text}`}>
                    {item.name}
                  </p>

                  <p className="mt-4 text-3xl font-bold text-[#1A1816]">
                    {loading ? '...' : item.count}
                  </p>

                  <p className="mt-3 text-xs font-medium text-[#756F69]">
                    View {item.name.toLowerCase()} applications →
                  </p>

                </Link>
              ))}

            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-10 rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-sm sm:p-7">

            <h2 className="text-2xl font-bold text-[#1A1816]">
              Quick Actions
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              <Link
                to="/admin/jobs"
                className="rounded-xl bg-[#E45128] px-6 py-5 font-semibold text-white transition hover:bg-[#1A1816]"
              >
                Manage Jobs

                <span className="mt-1 block text-sm font-normal text-white/80">
                  Add, edit and manage vacancies.
                </span>
              </Link>

              <Link
                to="/admin/applications"
                className="rounded-xl border border-[#E8E4DF] bg-white px-6 py-5 transition hover:border-[#E45128] hover:bg-[#FFF7F4]"
              >
                <p className="font-semibold text-[#1A1816]">
                  View Applications
                </p>

                <p className="mt-1 text-sm leading-6 text-[#756F69]">
                  Review candidate applications and CVs.
                </p>
              </Link>

              <Link
                to="/admin/enquiries"
                className="rounded-xl border border-[#E8E4DF] bg-white px-6 py-5 transition hover:border-[#E45128] hover:bg-[#FFF7F4]"
              >
                <p className="font-semibold text-[#1A1816]">
                  View Enquiries
                </p>

                <p className="mt-1 text-sm leading-6 text-[#756F69]">
                  Read and manage messages submitted through the contact form.
                </p>
              </Link>

              <Link
                to="/admin/testimonials"
                className="rounded-xl border border-[#F1C9BD] bg-[#FFF7F4] px-6 py-5 transition hover:border-[#E45128] hover:bg-[#FFF0EB]"
              >
                <div className="flex items-center justify-between gap-3">

                  <p className="font-semibold text-[#1A1816]">
                    Manage Testimonials
                  </p>

                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#E45128]">
                    {loading ? '...' : testimonialCount}
                  </span>

                </div>

                <p className="mt-1 text-sm leading-6 text-[#756F69]">
                  Review, publish or reject submitted testimonials.
                </p>
              </Link>

            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="mt-10 rounded-2xl border border-[#F1C9BD] bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E45128]">
                  Customer feedback
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#1A1816]">
                  {loading ? '...' : testimonialCount} pending testimonials
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#756F69]">
                  Review testimonials submitted by candidates and employers
                  before they appear publicly on the Reviews page.
                </p>

              </div>

              <Link
                to="/admin/testimonials"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#1A1816] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E45128] sm:w-auto"
              >
                Manage Testimonials →
              </Link>

            </div>
          </section>

          {/* ENQUIRIES */}
          <section className="mt-10 rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E45128]">
                  Contact enquiries
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#1A1816]">
                  {loading ? '...' : enquiryCount} website enquiries
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#756F69]">
                  View messages from candidates, employers and other visitors.
                </p>

              </div>

              <Link
                to="/admin/enquiries"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#1A1816] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E45128] sm:w-auto"
              >
                Manage Enquiries →
              </Link>

            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default Admin