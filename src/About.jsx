import { Link } from 'react-router-dom'
import vantoraLogo from './assets/vantora-logo.png'
import Footer from './Footer.jsx'

function About() {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

          {/* LOGO */}
          <Link to="/" className="block shrink-0">
            <img
              src={vantoraLogo}
              alt="Vantora Global Recruitment"
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            <Link
              to="/"
              className="text-sm font-medium hover:text-[#2563EB]"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-[#2563EB]"
            >
              About Us
            </Link>

            <Link
              to="/jobs"
              className="text-sm font-medium hover:text-[#2563EB]"
            >
              Jobs
            </Link>

            <Link
              to="/services"
              className="text-sm font-medium hover:text-[#2563EB]"
            >
              Services
            </Link>

            <Link
              to="/reviews"
              className="text-sm font-medium hover:text-[#2563EB]"
            >
              Reviews
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium hover:text-[#2563EB]"
            >
              Contact Us
            </Link>

          </nav>

          <Link
            to="/jobs"
            className="rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
          >
            Find a Job
          </Link>

        </div>
      </header>


      {/* HERO BANNER */}
      <main>

        <section
          className="relative overflow-hidden bg-[#0B1F3A] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/30677714/pexels-photo-30677714.jpeg?auto=compress&cs=tinysrgb&w=1800')",
          }}
        >

          <div className="absolute inset-0 bg-[#0B1F3A]/80"></div>

          <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-6 py-24 lg:px-8">

            <div className="max-w-4xl">

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                About Vantora
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                About Vantora Global Recruitment
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                We connect exceptional people with organisations where
                their skills, ambitions and experience can make a real
                difference.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <Link
                  to="/jobs"
                  className="rounded-lg bg-[#2563EB] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#38BDF8]"
                >
                  Explore Opportunities
                </Link>

                <Link
                  to="/contact"
                  className="rounded-lg border border-white/40 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Work With Us
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* WHO WE ARE / MISSION / VISION / COMMITMENT */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">

            {/* WHO WE ARE */}
            <div className="border-b border-slate-200 pb-14 text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                Who we are
              </p>

              <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-bold leading-tight md:text-4xl">
                A recruitment team with global reach.
              </h2>

              <p className="mx-auto mt-6 max-w-5xl leading-8 text-slate-600">
                Vantora Global Recruitment works across engineering,
                construction, finance, technology, healthcare, human
                resources, sales and administration. Our consultants
                combine sector knowledge with a genuine interest in the
                people they represent. We work with growing businesses,
                established groups and international organisations
                recruiting into the UK, Nigeria, the Gulf and remote-first
                teams.
              </p>

            </div>


            {/* MISSION / VISION / COMMITMENT */}
            <div className="mt-14">

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* OUR MISSION */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                  <div className="absolute left-0 top-0 h-1 w-0 bg-[#2563EB] transition-all duration-500 group-hover:w-full"></div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C] transition-colors duration-300 group-hover:text-[#2563EB]">
                    Our Mission
                  </p>

                  <h3 className="mt-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#2563EB]">
                    Creating meaningful connections.
                  </h3>

                  <p className="mt-5 leading-7 text-slate-600">
                    Our mission is to make recruitment more personal,
                    transparent and effective by connecting talented
                    professionals with organisations where they can thrive.
                  </p>

                  <p className="mt-5 leading-7 text-slate-600">
                    We focus on understanding people, understanding
                    organisations and creating matches that deliver value
                    beyond the initial placement.
                  </p>

                </div>


                {/* OUR VISION */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                  <div className="absolute left-0 top-0 h-1 w-0 bg-[#2563EB] transition-all duration-500 group-hover:w-full"></div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C] transition-colors duration-300 group-hover:text-[#2563EB]">
                    Our Vision
                  </p>

                  <h3 className="mt-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#2563EB]">
                    Building better futures through talent.
                  </h3>

                  <p className="mt-5 leading-7 text-slate-600">
                    To be the recruitment partner people return to at every
                    stage of their career and every stage of their company's
                    growth.
                  </p>

                  <p className="mt-5 leading-7 text-slate-600">
                    We aim to become a trusted recruitment brand recognised
                    for quality, professionalism and lasting relationships.
                  </p>

                </div>


                {/* OUR COMMITMENT */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                  <div className="absolute left-0 top-0 h-1 w-0 bg-[#2563EB] transition-all duration-500 group-hover:w-full"></div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C] transition-colors duration-300 group-hover:text-[#2563EB]">
                    Our Commitment
                  </p>

                  <h3 className="mt-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#2563EB]">
                    Recruitment with responsibility.
                  </h3>

                  <p className="mt-5 leading-7 text-slate-600">
                    Every candidate receives a response. Every client
                    receives a shortlist we can defend. We never put
                    forward a profile we would not hire ourselves.
                  </p>

                  <p className="mt-5 leading-7 text-slate-600">
                    We believe recruitment should be built on trust,
                    communication and respect. That means keeping candidates
                    informed, understanding client expectations and remaining
                    involved throughout the hiring journey.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* OUR VALUES */}
        <section className="bg-slate-50 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">

            {/* CENTRALIZED SECTION HEADING */}
            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                Our Values
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                What guides the way we work.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Our values shape every candidate conversation, every client
                partnership and every placement we make.
              </p>

            </div>


            {/* VALUE CARDS */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* INTEGRITY */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  01
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  Integrity
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We communicate honestly, act responsibly and do what we
                  say we will do.
                </p>

              </div>


              {/* PEOPLE FIRST */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  02
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  People First
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Behind every CV is a person, a goal and a future we take
                  seriously.
                </p>

              </div>


              {/* PRECISION */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  03
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  Precision
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We focus on the details that make a candidate and a role
                  genuinely compatible.
                </p>

              </div>


              {/* PARTNERSHIP */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  04
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  Partnership
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We build relationships designed to last beyond a single
                  recruitment process.
                </p>

              </div>


              {/* CLARITY */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  05
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  Clarity
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Clear communication keeps candidates and employers
                  confident throughout the process.
                </p>

              </div>


              {/* AMBITION */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A] text-xl font-bold text-white transition group-hover:bg-[#2563EB]">
                  06
                </div>

                <h3 className="text-xl font-bold group-hover:text-[#2563EB]">
                  Ambition
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We believe great recruitment should help people and
                  organisations move forward.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* HOW WE WORK */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">

            {/* CENTRALIZED SECTION HEADING */}
            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                How We Work
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                A recruitment process built around people.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                From the first conversation to the final placement, we keep
                the process focused, transparent and professional.
              </p>

            </div>


            {/* PROCESS CARDS */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {/* UNDERSTAND */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="text-4xl font-bold text-[#2563EB]">
                  01
                </div>

                <h3 className="mt-5 text-xl font-bold group-hover:text-[#2563EB]">
                  Understand
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We take time to understand your goals, requirements,
                  experience and expectations.
                </p>

              </div>


              {/* SEARCH */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="text-4xl font-bold text-[#2563EB]">
                  02
                </div>

                <h3 className="mt-5 text-xl font-bold group-hover:text-[#2563EB]">
                  Search
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We identify opportunities and talent that align with the
                  needs of both sides.
                </p>

              </div>


              {/* SCREEN */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="text-4xl font-bold text-[#2563EB]">
                  03
                </div>

                <h3 className="mt-5 text-xl font-bold group-hover:text-[#2563EB]">
                  Screen
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We assess experience, skills and suitability before
                  introducing candidates.
                </p>

              </div>


              {/* SUPPORT */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="text-4xl font-bold text-[#2563EB]">
                  04
                </div>

                <h3 className="mt-5 text-xl font-bold group-hover:text-[#2563EB]">
                  Support
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We remain involved throughout the hiring journey to keep
                  communication clear and the process moving.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* CTA */}
        <section className="bg-[#0B1F3A] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

              <div className="max-w-3xl">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                  Let's Work Together
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
                  Ready to take the next step?
                </h2>

                <p className="mt-5 leading-7 text-slate-300">
                  Whether you are looking for your next opportunity or
                  searching for the right person to join your team, Vantora
                  Global Recruitment is ready to help.
                </p>

              </div>

              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">

                <Link
                  to="/jobs"
                  className="rounded-lg bg-[#2563EB] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#38BDF8]"
                >
                  Find a Job
                </Link>

                <Link
                  to="/contact"
                  className="rounded-lg border border-white/30 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </div>
        </section>

      </main>


      {/* REUSABLE FOOTER */}
      <Footer />

    </div>
  )
}

export default About