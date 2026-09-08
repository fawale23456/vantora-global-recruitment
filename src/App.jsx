import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import vantoraLogo from './assets/vantora-logo.png'

import Footer from './Footer.jsx'
import CookieConsent from './CookieConsent.jsx'

import Jobs from './Jobs.jsx'
import JobDetails from './JobDetails.jsx'
import Apply from './Apply.jsx'
import About from './About.jsx'
import Services from './Services.jsx'
import Reviews from './Reviews.jsx'
import Contact from './Contact.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import CookiePolicy from './CookiePolicy.jsx'

import Admin from './Admin.jsx'
import AdminJobs from './AdminJobs.jsx'
import AdminApplications from './AdminApplications.jsx'
import AdminEnquiries from './AdminEnquiries.jsx'
import AdminTestimonials from './AdminTestimonials.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminProtectedRoute from './AdminProtectedRoute.jsx'

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#1A1816] text-[#F7F3EF]">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={vantoraLogo}
              alt="Vantora Global Recruitment"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-2 lg:flex">

            <Link
              to="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              About Us
            </Link>

            <Link
              to="/jobs"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              Jobs
            </Link>

            <Link
              to="/services"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              Services
            </Link>

            <Link
              to="/reviews"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              Reviews
            </Link>

            <Link
              to="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
            >
              Contact Us
            </Link>

          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">

            <Link
              to="/jobs"
              className="inline-flex items-center rounded-lg bg-[#E45128] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              Find a Job
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition-all duration-200 hover:border-black hover:bg-slate-100 hover:text-black lg:hidden"
            aria-label="Toggle menu"
          >

            {mobileMenuOpen ? (

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            ) : (

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

            )}

          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (

          <div className="border-t border-slate-200 bg-white lg:hidden">

            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                About Us
              </Link>

              <Link
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                Jobs
              </Link>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                Services
              </Link>

              <Link
                to="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                Reviews
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-b border-slate-200 px-3 py-3 text-sm font-medium text-[#E45128] transition-all duration-200 hover:bg-slate-100 hover:text-black"
              >
                Contact Us
              </Link>

              <Link
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#E45128] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
              >
                Find a Job
              </Link>

            </nav>

          </div>

        )}

      </header>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {/* HERO IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/5945438/pexels-photo-5945438.jpeg?cs=srgb&dl=pexels-theo-decker-5945438.jpg&fm=jpg')",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#1A1816]/75" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">

          <div className="max-w-3xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
              Vantora Global Recruitment
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">

              Find the right opportunity

              <span className="block text-[#E45128]">
                Build the right team.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#DDD6D0]">
              Vantora Global Recruitment places professionals with leading
              organisations worldwide — and helps candidates present a CV
              that wins the role.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-lg bg-[#E45128] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
              >
                Explore Jobs
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
              >
                Talk to Our Team
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SEARCH CARD ================= */}
      <section className="relative -mt-10 px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl rounded-2xl border border-[#3A322D] bg-[#211C18] p-6 shadow-xl sm:p-8">

          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">

            <div>

              <label className="mb-2 block text-sm font-semibold text-[#F7F3EF]">
                Job title
              </label>

              <input
                type="text"
                placeholder="e.g. Civil Engineer"
                className="w-full rounded-lg border border-[#3A322D] bg-[#1A1816] px-4 py-3 text-sm text-[#F7F3EF] outline-none transition placeholder:text-[#817870] focus:border-[#E45128] focus:ring-2 focus:ring-[#E45128]/20"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-[#F7F3EF]">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Lagos, Nigeria"
                className="w-full rounded-lg border border-[#3A322D] bg-[#1A1816] px-4 py-3 text-sm text-[#F7F3EF] outline-none transition placeholder:text-[#817870] focus:border-[#E45128] focus:ring-2 focus:ring-[#E45128]/20"
              />

            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-[#E45128] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              Search Jobs
            </Link>

          </div>

        </div>

      </section>


      {/* ================= TRUSTED SECTORS ================= */}
      <section className="bg-[#1A1816] py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
              Our sectors
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F7F3EF] sm:text-4xl">
              Recruitment expertise built around your industry.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#A49B94]">
              We connect organisations with professionals across key
              industries while helping candidates find opportunities that
              match their experience and ambitions.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: 'Legal',
                text: 'Legal professionals for firms and organisations seeking specialist expertise.',
              },
              {
                title: 'Finance',
                text: 'Financial professionals who bring accuracy, insight and commercial value.',
              },
              {
                title: 'Professional Services',
                text: 'Experienced professionals across a wide range of specialist business functions.',
              },
              {
                title: 'Engineering',
                text: 'Skilled technical professionals for projects, operations and development.',
              },
            ].map((sector) => (

              <div
                key={sector.title}
                className="rounded-2xl border border-[#3A322D] bg-[#211C18] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:shadow-md"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E45128]/10 text-[#E45128]">
                  <span className="text-xl font-bold">
                    V
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F7F3EF]">
                  {sector.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#A49B94]">
                  {sector.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CANDIDATES / EMPLOYERS ================= */}
      <section className="bg-[#211C18] py-20">

        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* CANDIDATES */}
          <div className="rounded-3xl border border-[#3A322D] bg-[#1A1816] p-8 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:shadow-md sm:p-10">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
              For candidates
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#F7F3EF]">
              Take the next step in your career.
            </h2>

            <p className="mt-4 leading-7 text-[#A49B94]">
              Discover opportunities that match your skills, experience and
              ambitions. From your first application to the next stage of the
              process, we're here to help you move forward.
            </p>

            <ul className="mt-6 space-y-3">

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Access current job opportunities</span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Find roles matched to your experience</span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Professional application support</span>
              </li>

            </ul>

            <Link
              to="/jobs"
              className="mt-7 inline-flex rounded-lg bg-[#E45128] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              Browse Vacancies
            </Link>

          </div>


          {/* EMPLOYERS */}
          <div className="rounded-3xl border border-[#3A322D] bg-[#1A1816] p-8 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:shadow-md sm:p-10">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
              For employers
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#F7F3EF]">
              Find people who move your business forward.
            </h2>

            <p className="mt-4 leading-7 text-[#A49B94]">
              Finding the right person shouldn't mean sorting through countless
              unsuitable applications. We help organisations identify capable
              professionals who match their requirements and objectives.
            </p>

            <ul className="mt-6 space-y-3">

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Qualified candidate sourcing</span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Candidate screening and shortlisting</span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-[#A49B94]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E45128]" />
                <span>Permanent and contract recruitment</span>
              </li>

            </ul>

            <Link
              to="/contact"
              className="mt-7 inline-flex rounded-lg bg-[#E45128] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              Speak to Our Team
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FEATURED JOBS ================= */}
      <section className="bg-[#1A1816] py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
              Opportunities
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#F7F3EF] sm:text-4xl">
              Explore current vacancies.
            </h2>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {[
              {
                title: 'Civil Engineer',
                location: 'Lagos, Nigeria',
                type: 'Full Time',
              },
              {
                title: 'Project Manager',
                location: 'Lagos, Nigeria',
                type: 'Full Time',
              },
              {
                title: 'Financial Analyst',
                location: 'Lagos, Nigeria',
                type: 'Full Time',
              },
            ].map((job) => (

              <div
                key={job.title}
                className="rounded-2xl border border-[#3A322D] bg-[#211C18] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:shadow-md"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-lg font-bold text-[#F7F3EF]">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#817870]">
                      {job.location}
                    </p>

                  </div>

                  <span className="rounded-full bg-[#E45128]/10 px-3 py-1 text-xs font-semibold text-[#E45128]">
                    {job.type}
                  </span>

                </div>

                <Link
                  to="/jobs"
                  className="mt-6 inline-flex text-sm font-semibold text-[#E45128] transition-all duration-200 hover:text-white"
                >
                  View position →
                </Link>

              </div>

            ))}

          </div>

          <div className="mt-10 flex justify-center">

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-[#E45128] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              View All Opportunities
            </Link>

          </div>

        </div>

      </section>


      {/* ================= CV SUPPORT ================= */}
      <section className="bg-[#1A1816] py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E45128]">
                Candidate support
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#F7F3EF] sm:text-4xl">
                Present your experience with confidence.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-[#A49B94]">
                Your CV is often the first impression an employer has of you.
                We help candidates understand how to present their skills,
                experience and achievements clearly.
              </p>

              <Link
                to="/services"
                className="mt-7 inline-flex rounded-lg bg-[#E45128] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:text-white"
              >
                Explore Our Services
              </Link>

            </div>

            <div className="rounded-3xl border border-[#3A322D] bg-[#211C18] p-8">

              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <div className="text-3xl font-bold text-[#E45128]">
                    01
                  </div>

                  <h3 className="mt-3 font-bold text-[#F7F3EF]">
                    Understand your strengths
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A49B94]">
                    Identify the experience and skills that make you stand out.
                  </p>

                </div>

                <div>

                  <div className="text-3xl font-bold text-[#E45128]">
                    02
                  </div>

                  <h3 className="mt-3 font-bold text-[#F7F3EF]">
                    Improve your CV
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A49B94]">
                    Present your professional experience clearly and
                    effectively.
                  </p>

                </div>

                <div>

                  <div className="text-3xl font-bold text-[#E45128]">
                    03
                  </div>

                  <h3 className="mt-3 font-bold text-[#F7F3EF]">
                    Find suitable roles
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A49B94]">
                    Focus your search on opportunities that match your goals.
                  </p>

                </div>

                <div>

                  <div className="text-3xl font-bold text-[#E45128]">
                    04
                  </div>

                  <h3 className="mt-3 font-bold text-[#F7F3EF]">
                    Move forward
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A49B94]">
                    Approach your next career opportunity with confidence.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  )
}


function App() {
  return (
    <>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/reviews"
          element={<Reviews />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:jobTitle"
          element={<JobDetails />}
        />

        <Route
          path="/apply/:jobTitle"
          element={<Apply />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/cookie-policy"
          element={<CookiePolicy />}
        />


        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ================= PROTECTED ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <AdminProtectedRoute>
              <AdminJobs />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <AdminApplications />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <AdminProtectedRoute>
              <AdminEnquiries />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/testimonials"
          element={
            <AdminProtectedRoute>
              <AdminTestimonials />
            </AdminProtectedRoute>
          }
        />

      </Routes>


      {/* ================= COOKIE CONSENT ================= */}
      <CookieConsent />

    </>
  )
}

export default App