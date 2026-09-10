import { Link } from 'react-router-dom'

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-lg font-bold tracking-wide text-[#0B1F3A] transition hover:text-[#D4A72C]"
          >
            VANTORA GLOBAL RECRUITMENT
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#0B1F3A] transition hover:text-[#D4A72C]"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0B1F3A]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
            Cookie Policy
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How we use cookies
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This Cookie Policy explains how Vantora Global Recruitment uses
            cookies and similar technologies when you visit our website.
          </p>

          <p className="mt-5 text-sm text-slate-400">
            Effective date: September 5, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              1. What Are Cookies?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Cookies are small text files that websites place on your device
              when you visit them. They help websites remember information
              about your visit, improve functionality, understand how visitors
              use the website, and provide a better overall experience.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              2. How We Use Cookies
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Vantora Global Recruitment may use cookies and similar
              technologies for purposes such as:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
              <li>Keeping the website functioning properly.</li>
              <li>Remembering certain preferences.</li>
              <li>Improving website performance and usability.</li>
              <li>Understanding how visitors interact with our website.</li>
              <li>Supporting security and preventing misuse.</li>
              <li>Managing cookie consent preferences.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              3. Types of Cookies We May Use
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-bold text-[#0B1F3A]">
                  Essential Cookies
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  These cookies are necessary for certain parts of the website
                  to function correctly. They may support security, navigation,
                  authentication, and other essential website functions.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-bold text-[#0B1F3A]">
                  Preference Cookies
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  These cookies may remember choices or preferences you make
                  while using the website so that your experience can be more
                  convenient.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-bold text-[#0B1F3A]">
                  Analytics Cookies
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Where analytics tools are used, these cookies may help us
                  understand how visitors use our website, such as which pages
                  are visited and how users interact with different features.
                </p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              4. Cookie Consent
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              When you first visit our website, we may display a cookie
              consent notice asking whether you accept or reject non-essential
              cookies.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Your preference may be stored on your device so that we can
              remember your choice. You may be able to change or withdraw your
              preference depending on the cookie controls available on the
              website.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              5. Third-Party Cookies
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Some services used on our website may place cookies or similar
              technologies on your device. These may include hosting,
              authentication, analytics, security, or other technology
              providers.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Third-party providers may process information according to their
              own privacy policies and terms. We recommend reviewing the
              policies of any third-party services that you use through our
              website.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              6. Managing Cookies
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You can control or delete cookies through your browser settings.
              Most browsers allow you to block cookies, delete existing
              cookies, or receive a notification before cookies are stored.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Please note that disabling certain cookies may affect how some
              features of the website function.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              7. Cookies and Personal Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Cookies do not necessarily identify you by name. However, some
              cookie-related information may be considered personal
              information depending on how it is collected and combined with
              other information.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              For information about how Vantora Global Recruitment handles
              personal information, please see our{' '}
              <Link
                to="/privacy-policy"
                className="font-semibold text-[#2563EB] underline decoration-[#D4A72C] underline-offset-4 transition hover:text-[#D4A72C]"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              8. Changes to This Cookie Policy
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We may update this Cookie Policy from time to time to reflect
              changes to our website, technology, services, or legal
              requirements.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Any updates will be published on this page, and the effective
              date will be updated where appropriate.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              9. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              If you have questions about this Cookie Policy or how cookies
              are used on our website, you can contact us at:
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-[#0B1F3A]">
                Vantora Global Recruitment
              </p>

              <p className="mt-2 text-slate-600">
                Email:{' '}
                <a
                  href="mailto:support@vantoraglobalrecruitments.com"
                  className="font-medium text-[#2563EB] hover:text-[#D4A72C]"
                >
                  support@vantoraglobalrecruitments.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Legal note */}
        <div className="mt-14 rounded-xl border border-[#D4A72C]/30 bg-[#D4A72C]/5 p-6">
          <p className="text-sm leading-6 text-slate-600">
            <strong className="text-[#0B1F3A]">Important:</strong> This Cookie
            Policy is provided for general informational purposes. It should
            be reviewed and adapted by a qualified legal professional to
            ensure that it accurately reflects the cookies, tracking
            technologies, third-party services, and legal requirements
            applicable to Vantora Global Recruitment.
          </p>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-[#0B1F3A]">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Vantora Global Recruitment. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default CookiePolicy