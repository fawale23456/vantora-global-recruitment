import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.95fr_0.95fr_2.15fr]">

          <div>
            <h3 className="text-lg font-bold text-[#D4A72C]">
              VANTORA GLOBAL RECRUITMENT
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Connecting the right people with the right roles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#D4A72C]">
              Quick Links
            </h4>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <Link className="block transition hover:text-[#D4A72C]" to="/">
                Home
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/about">
                About Us
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/jobs">
                Jobs
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/services">
                Services
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/reviews">
                Testimonials
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/contact">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#D4A72C]">
              For Candidates
            </h4>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <Link className="block transition hover:text-[#D4A72C]" to="/jobs">
                Find Jobs
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/contact">
                Submit Your CV
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/services">
                Career Support
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/contact">
                Candidates FAQs
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#D4A72C]">
              For Employers
            </h4>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <Link className="block transition hover:text-[#D4A72C]" to="/services">
                Find Talent
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/contact">
                Submit Vacancy
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/services">
                Recruitment Services
              </Link>

              <Link className="block transition hover:text-[#D4A72C]" to="/contact">
                Employer FAQs
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#D4A72C]">
              Get In Touch
            </h4>

            <div className="mt-4 space-y-3 text-sm text-slate-300">

              <a
                href="mailto:info@vantoraglobalrecruitment.com"
                className="flex items-center gap-2 transition hover:text-[#D4A72C]"
              >
                <span className="text-[#D4A72C]">✉</span>

                <span className="min-w-0 whitespace-nowrap">
                  info@vantoraglobalrecruitment.com
                </span>
              </a>

              <p className="flex items-center gap-2 font-semibold text-white">
                <span className="text-[#D4A72C]">◷</span>
                Business Hours
              </p>

              <p>Monday - Friday:</p>

              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-center text-sm text-slate-400">

          <p>
            © {new Date().getFullYear()} Vantora Global Recruitment. All rights reserved.
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-5">

            <Link
              to="/privacy-policy"
              className="transition hover:text-[#D4A72C]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-[#D4A72C]"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/cookie-policy"
              className="transition hover:text-[#D4A72C]"
            >
              Cookie Policy
            </Link>

          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer