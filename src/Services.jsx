import { Link } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Services() {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">

      <Header />


      <main>

        {/* HERO BANNER */}
        <section
          className="relative overflow-hidden bg-[#0B1F3A] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6146812/pexels-photo-6146812.jpeg?auto=compress&cs=tinysrgb&w=1800')",
          }}
        >

          <div className="absolute inset-0 bg-[#0B1F3A]/80"></div>

          <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-6 py-24 lg:px-8">

            <div className="max-w-4xl">

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                Our Services
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                Recruitment solutions built around people and businesses.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                Whether you're searching for your next opportunity or building
                your team, Vantora Global Recruitment provides focused,
                professional recruitment support from start to finish.
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


        {/* SERVICES */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-12 max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                What we offer
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Recruitment support that works for you
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Practical recruitment solutions designed to help candidates
                find meaningful opportunities and employers secure the right
                talent.
              </p>

            </div>


            <div className="grid gap-6 md:grid-cols-2">

              {/* CANDIDATES */}
              <div className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-6 h-1 w-12 rounded-full bg-[#D4A72C] transition-all duration-300 group-hover:w-24 group-hover:bg-[#2563EB]"></div>

                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                  For Candidates
                </p>

                <h3 className="mt-4 text-2xl font-bold group-hover:text-[#2563EB]">
                  Find your next opportunity
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We connect professionals with roles that match their
                  experience, ambitions and career goals.
                </p>

                <ul className="mt-6 space-y-3 text-slate-600">

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Access to relevant live opportunities
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Guided application support
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    CV review and professional rewriting
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Honest feedback throughout the process
                  </li>

                </ul>

                <Link
                  to="/jobs"
                  className="mt-8 inline-block rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition hover:bg-[#0B1F3A]"
                >
                  Browse Opportunities
                </Link>

              </div>


              {/* EMPLOYERS */}
              <div className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl">

                <div className="mb-6 h-1 w-12 rounded-full bg-[#D4A72C] transition-all duration-300 group-hover:w-24 group-hover:bg-[#2563EB]"></div>

                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                  For Employers
                </p>

                <h3 className="mt-4 text-2xl font-bold group-hover:text-[#2563EB]">
                  Find the right talent
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  We help organisations identify and secure strong candidates
                  through focused, sector-specialist recruitment.
                </p>

                <ul className="mt-6 space-y-3 text-slate-600">

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Permanent and contract recruitment
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Executive search
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Focused candidate shortlists
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#D4A72C]">✓</span>
                    Sector-specialist consultants
                  </li>

                </ul>

                <Link
                  to="/contact"
                  className="mt-8 inline-block rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition hover:bg-[#0B1F3A]"
                >
                  Talk to Our Team
                </Link>

              </div>

            </div>

          </div>
        </section>


        {/* OPPORTUNITIES */}
        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
                Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Specialist recruitment across key sectors
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Our consultants work across a broad range of professional
                sectors, helping candidates and employers make the right
                connections.
              </p>

            </div>


            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              {[
                'Legal',
                'Finance',
                'Technology',
                'Human Resources',
                'Operations',
              ].map((sector) => (
                <div
                  key={sector}
                  className="group rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg"
                >
                  <p className="font-semibold text-[#0B1F3A] transition-colors group-hover:text-[#2563EB]">
                    {sector}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </section>


        {/* CV SUPPORT */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-2xl bg-[#0B1F3A] px-8 py-12 text-center text-white md:px-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              CV Support
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Your CV not ready? We've got you.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              We can sharpen your existing CV or write one from scratch,
              helping you present your experience clearly and professionally.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-block rounded-lg bg-[#2563EB] px-7 py-3 font-semibold text-white transition hover:bg-[#38BDF8]"
            >
              Get CV Support
            </Link>

          </div>
        </section>


        {/* CTA */}
        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              Let's Work Together
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Ready to make your next move?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Tell us what you're looking for and our team will help you take
              the next step.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/jobs"
                className="rounded-lg bg-[#2563EB] px-7 py-3 font-semibold text-white transition hover:bg-[#0B1F3A]"
              >
                Find Opportunities
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-[#0B1F3A] px-7 py-3 font-semibold text-[#0B1F3A] transition hover:bg-[#0B1F3A] hover:text-white"
              >
                Contact Us
              </Link>

            </div>

          </div>
        </section>

      </main>


      <Footer />

    </div>
  )
}

export default Services