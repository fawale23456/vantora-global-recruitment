import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from './supabase'

function generateUniqueId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < 20; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
  }

  return result
}

function Apply() {
  const { jobTitle } = useParams()

  const decodedJobTitle = jobTitle
    ? decodeURIComponent(jobTitle)
    : 'Job Application'

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    linkedin: '',
    summary: '',
    coverLetter: '',
  })

  const [cvFile, setCvFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]

    if (!file) {
      setCvFile(null)
      return
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    const fileExtension = file.name
      .split('.')
      .pop()
      ?.toLowerCase()

    const allowedExtensions = ['pdf', 'doc', 'docx']

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      setError('Please upload your CV as a PDF, DOC, or DOCX file.')
      setCvFile(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Your CV must not be larger than 5MB.')
      setCvFile(null)
      return
    }

    setError('')
    setCvFile(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSuccess(false)

    if (!cvFile) {
      setError('Please upload your CV before submitting your application.')
      return
    }

    if (cvFile.size > 5 * 1024 * 1024) {
      setError('Your CV must not be larger than 5MB.')
      return
    }

    setSubmitting(true)

    try {
      const safeEmail = form.email
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')

      const fileExtension =
        cvFile.name.split('.').pop()?.toLowerCase() || 'pdf'

      const uniqueFileName = `${Date.now()}-${generateUniqueId()}.${fileExtension}`

      const filePath = `${safeEmail}/${uniqueFileName}`

      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(filePath, cvFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabase.storage
        .from('cvs')
        .getPublicUrl(filePath)

      const cvUrl = publicUrlData?.publicUrl || ''

      const { error: insertError } = await supabase
        .from('Applications')
        .insert([
          {
            job_title: decodedJobTitle,
            full_name: form.fullName,
            email: form.email,
            phone: form.phone,
            location: form.location,
            years_of_experience: form.experience,
            linkedin: form.linkedin,
            professional_summary: form.summary,
            cover_letter: form.coverLetter,
            cv_url: cvUrl,
            status: 'Pending',
          },
        ])

      if (insertError) {
        throw insertError
      }

      setSuccess(true)

      setForm({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        linkedin: '',
        summary: '',
        coverLetter: '',
      })

      setCvFile(null)

      const fileInput = document.getElementById('cv')
      if (fileInput) {
        fileInput.value = ''
      }
    } catch (submitError) {
      console.error('Application submission error:', submitError)

      setError(
        submitError?.message ||
          'Something went wrong while submitting your application. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0B1F3A]">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="text-lg font-extrabold tracking-tight text-[#0B1F3A] sm:text-xl"
          >
            VANTORA GLOBAL RECRUITMENT
          </Link>

          <Link
            to="/jobs"
            className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B1F3A]"
          >
            Back to Jobs
          </Link>

        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="bg-[#0B1F3A]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
            Career Opportunity
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Apply for {decodedJobTitle}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Submit your application and CV. Our recruitment team will review
            your profile and contact you if your experience matches the
            opportunity.
          </p>

        </div>
      </section>

      {/* ================= APPLICATION FORM ================= */}

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 lg:p-10">

          {success && (
            <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5">

              <h2 className="text-lg font-bold text-green-800">
                Application Submitted Successfully
              </h2>

              <p className="mt-2 text-sm leading-6 text-green-700">
                Thank you for applying for this position. Your application has
                been received successfully. Our recruitment team will review
                your details and contact you if you are shortlisted.
              </p>

              <Link
                to="/jobs"
                className="mt-4 inline-block font-semibold text-green-800 underline"
              >
                View Other Jobs
              </Link>

            </div>
          )}

          {error && (
            <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5">

              <p className="text-sm font-medium leading-6 text-red-700">
                {error}
              </p>

            </div>
          )}

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Application Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Please provide accurate information so our recruitment team can
              properly assess your application.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* Full Name */}

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Full Name *
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Phone Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location */}

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Current Location *
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="City, State, Country"
              />
            </div>

            {/* Experience */}

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Years of Experience *
              </label>

              <input
                id="experience"
                name="experience"
                type="text"
                value={form.experience}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="e.g. 3 years"
              />
            </div>

            {/* LinkedIn */}

            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                LinkedIn Profile
                <span className="ml-1 font-normal text-slate-500">
                  (Optional)
                </span>
              </label>

              <input
                id="linkedin"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Professional Summary */}

            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Professional Summary *
              </label>

              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                required
                rows="6"
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Tell us briefly about your professional background, skills and experience."
              />
            </div>

            {/* CV Upload */}

            <div>
              <label
                htmlFor="cv"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Upload CV *
              </label>

              <input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                required
                className="mt-2 block w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#0B1F3A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2563EB]"
              />

              <p className="mt-2 text-xs text-slate-500">
                Accepted formats: PDF, DOC, DOCX. Maximum file size: 5MB.
              </p>

              {cvFile && (
                <p className="mt-2 text-sm font-medium text-[#2563EB]">
                  Selected file: {cvFile.name}
                </p>
              )}
            </div>

            {/* Cover Letter */}

            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-semibold text-[#0B1F3A]"
              >
                Cover Letter / Message
                <span className="ml-1 font-normal text-slate-500">
                  (Optional)
                </span>
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                rows="7"
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Add a cover letter or any additional information you would like us to know."
              />
            </div>

            {/* Submit */}

            <div className="pt-2">

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? 'Submitting Application...'
                  : 'Submit Application'}
              </button>

            </div>

          </form>

        </div>

      </main>

      {/* ================= FOOTER ================= */}

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

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/"
                >
                  Home
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/about"
                >
                  About Us
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/jobs"
                >
                  Jobs
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/services"
                >
                  Services
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/reviews"
                >
                  Testimonials
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/contact"
                >
                  Contact Us
                </Link>

              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#D4A72C]">
                For Candidates
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-300">

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/jobs"
                >
                  Find Jobs
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/contact"
                >
                  Submit Your CV
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/services"
                >
                  Career Support
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/contact"
                >
                  Candidates FAQs
                </Link>

              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#D4A72C]">
                For Employers
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-300">

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/services"
                >
                  Find Talent
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/contact"
                >
                  Submit Vacancy
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/services"
                >
                  Recruitment Services
                </Link>

                <Link
                  className="block transition hover:text-[#D4A72C]"
                  to="/contact"
                >
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
                  href="mailto:support@vantoraglobalrecruitments.com"
                  className="flex items-center gap-2 transition hover:text-[#D4A72C]"
                >
                  <span className="text-[#D4A72C]">✉</span>

                  <span className="min-w-0 whitespace-nowrap">
                    support@vantoraglobalrecruitments.com
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
              © {new Date().getFullYear()} Vantora Global Recruitment. All
              rights reserved.
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

    </div>
  )
}

export default Apply