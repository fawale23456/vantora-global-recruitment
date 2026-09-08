import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'

const EMPTY_JOB = {
  title: '',
  company: '',
  location: '',
  department: '',
  type: '',
  salary: '',
  description: '',
  requirements: '',
}

function AdminJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newJob, setNewJob] = useState(EMPTY_JOB)

  const [editingId, setEditingId] = useState(null)
  const [editJob, setEditJob] = useState(EMPTY_JOB)

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    setLoading(true)
    setError('')

    const { data, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (jobsError) {
      console.error(jobsError)
      setError(jobsError.message)
      setJobs([])
    } else {
      setJobs(data || [])
    }

    setLoading(false)
  }

  function handleNewJobChange(event) {
    const { name, value } = event.target

    setNewJob((currentJob) => ({
      ...currentJob,
      [name]: value,
    }))
  }

  function handleEditJobChange(event) {
    const { name, value } = event.target

    setEditJob((currentJob) => ({
      ...currentJob,
      [name]: value,
    }))
  }

  async function addJob(event) {
    event.preventDefault()

    setSaving(true)
    setError('')
    setSuccess('')

    const { data, error: insertError } = await supabase
      .from('jobs')
      .insert([newJob])
      .select()
      .single()

    if (insertError) {
      console.error(insertError)
      setError(insertError.message)
      setSaving(false)
      return
    }

    setJobs((currentJobs) => [data, ...currentJobs])

    setNewJob(EMPTY_JOB)

    setSuccess('Job added successfully.')
    setSaving(false)
  }

  function startEditing(job) {
    setEditingId(job.id)

    setEditJob({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      department: job.department || '',
      type: job.type || '',
      salary: job.salary || '',
      description: job.description || '',
      requirements: job.requirements || '',
    })

    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function cancelEditing() {
    setEditingId(null)
    setEditJob(EMPTY_JOB)
    setError('')
  }

  async function saveEdit(event) {
    event.preventDefault()

    if (!editingId) return

    setSaving(true)
    setError('')
    setSuccess('')

    const { data, error: updateError } = await supabase
      .from('jobs')
      .update(editJob)
      .eq('id', editingId)
      .select()
      .single()

    if (updateError) {
      console.error(updateError)
      setError(updateError.message)
      setSaving(false)
      return
    }

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === editingId ? data : job,
      ),
    )

    setEditingId(null)
    setEditJob(EMPTY_JOB)

    setSuccess('Job updated successfully.')
    setSaving(false)
  }

  async function deleteJob(jobId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job?',
    )

    if (!confirmed) return

    setDeletingId(jobId)
    setError('')
    setSuccess('')

    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)

    if (deleteError) {
      console.error(deleteError)
      setError(deleteError.message)
      setDeletingId(null)
      return
    }

    setJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== jobId),
    )

    if (editingId === jobId) {
      cancelEditing()
    }

    setSuccess('Job deleted successfully.')
    setDeletingId(null)
  }

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
              Manage Jobs
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

        {/* INTRO */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Vacancies
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add, edit and manage vacancies published on the website.
          </p>
        </div>


        {/* MESSAGES */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}


        {/* EDIT FORM */}
        {editingId && (
          <section className="mb-8 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Editing vacancy
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Edit Job
              </h2>
            </div>

            <form
              onSubmit={saveEdit}
              className="grid gap-5 md:grid-cols-2"
            >

              {/* JOB TITLE */}
              <JobInput
                label="Job title"
                name="title"
                value={editJob.title}
                onChange={handleEditJobChange}
                required
              />

              {/* COMPANY */}
              <JobInput
                label="Company"
                name="company"
                value={editJob.company}
                onChange={handleEditJobChange}
                required
              />

              {/* LOCATION */}
              <JobInput
                label="Location"
                name="location"
                value={editJob.location}
                onChange={handleEditJobChange}
                required
              />

              {/* DEPARTMENT */}
              <JobInput
                label="Department"
                name="department"
                value={editJob.department}
                onChange={handleEditJobChange}
                placeholder="e.g. Human Resources"
                required
              />

              {/* JOB TYPE */}
              <JobInput
                label="Job type"
                name="type"
                value={editJob.type}
                onChange={handleEditJobChange}
                required
              />

              {/* SALARY */}
              <JobInput
                label="Salary"
                name="salary"
                value={editJob.salary}
                onChange={handleEditJobChange}
                required
              />

              {/* DESCRIPTION */}
              <div className="md:col-span-2">

                <label
                  htmlFor="edit-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Job Description
                </label>

                <textarea
                  id="edit-description"
                  name="description"
                  value={editJob.description}
                  onChange={handleEditJobChange}
                  rows={7}
                  placeholder="Describe the role, responsibilities and opportunity..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* REQUIREMENTS */}
              <div className="md:col-span-2">

                <label
                  htmlFor="edit-requirements"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Requirements
                </label>

                <textarea
                  id="edit-requirements"
                  name="requirements"
                  value={editJob.requirements}
                  onChange={handleEditJobChange}
                  rows={7}
                  placeholder="List the qualifications, skills and experience required..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Saving changes...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

              </div>

            </form>

          </section>
        )}


        {/* ADD JOB FORM */}
        {!editingId && (
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                New vacancy
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Add a Job
              </h2>
            </div>

            <form
              onSubmit={addJob}
              className="grid gap-5 md:grid-cols-2"
            >

              {/* JOB TITLE */}
              <JobInput
                label="Job title"
                name="title"
                value={newJob.title}
                onChange={handleNewJobChange}
                required
              />

              {/* COMPANY */}
              <JobInput
                label="Company"
                name="company"
                value={newJob.company}
                onChange={handleNewJobChange}
                required
              />

              {/* LOCATION */}
              <JobInput
                label="Location"
                name="location"
                value={newJob.location}
                onChange={handleNewJobChange}
                required
              />

              {/* DEPARTMENT */}
              <JobInput
                label="Department"
                name="department"
                value={newJob.department}
                onChange={handleNewJobChange}
                placeholder="e.g. Human Resources"
                required
              />

              {/* JOB TYPE */}
              <JobInput
                label="Job type"
                name="type"
                value={newJob.type}
                onChange={handleNewJobChange}
                required
              />

              {/* SALARY */}
              <JobInput
                label="Salary"
                name="salary"
                value={newJob.salary}
                onChange={handleNewJobChange}
                required
              />

              {/* DESCRIPTION */}
              <div className="md:col-span-2">

                <label
                  htmlFor="new-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Job Description
                </label>

                <textarea
                  id="new-description"
                  name="description"
                  value={newJob.description}
                  onChange={handleNewJobChange}
                  rows={7}
                  placeholder="Describe the role, responsibilities and opportunity..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* REQUIREMENTS */}
              <div className="md:col-span-2">

                <label
                  htmlFor="new-requirements"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Requirements
                </label>

                <textarea
                  id="new-requirements"
                  name="requirements"
                  value={newJob.requirements}
                  onChange={handleNewJobChange}
                  rows={7}
                  placeholder="List the qualifications, skills and experience required..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* ADD BUTTON */}
              <div className="md:col-span-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? 'Adding job...' : 'Add Job'}
                </button>

              </div>

            </form>

          </section>
        )}


        {/* JOB LIST */}
        <section>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Current Vacancies
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {jobs.length} job{jobs.length === 1 ? '' : 's'} currently listed.
              </p>
            </div>

          </div>


          {/* LOADING */}
          {loading ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading jobs...
              </p>

            </div>

          ) : jobs.length === 0 ? (

            /* NO JOBS */
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

              <p className="text-sm text-slate-500">
                No jobs found.
              </p>

            </div>

          ) : (

            /* JOB CARDS */
            <div className="grid gap-5 lg:grid-cols-2">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >

                  <div className="flex flex-col gap-5">

                    <div>

                      {/* DEPARTMENT */}
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {job.department || 'Department not specified'}
                      </p>

                      {/* TITLE */}
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {job.title}
                      </h3>

                      {/* COMPANY */}
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {job.company}
                      </p>

                      {/* DETAILS */}
                      <div className="mt-4 space-y-1 text-sm text-slate-500">

                        <p>
                          <span className="font-medium text-slate-700">
                            Location:
                          </span>{' '}
                          {job.location || '—'}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Department:
                          </span>{' '}
                          {job.department || '—'}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Type:
                          </span>{' '}
                          {job.type || '—'}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Salary:
                          </span>{' '}
                          {job.salary || '—'}
                        </p>

                      </div>

                      {/* DESCRIPTION */}
                      {job.description && (
                        <div className="mt-5 border-t border-slate-100 pt-4">

                          <p className="text-sm font-semibold text-slate-900">
                            Description
                          </p>

                          <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-500">
                            {job.description}
                          </p>

                        </div>
                      )}

                      {/* REQUIREMENTS */}
                      {job.requirements && (
                        <div className="mt-4">

                          <p className="text-sm font-semibold text-slate-900">
                            Requirements
                          </p>

                          <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-500">
                            {job.requirements}
                          </p>

                        </div>
                      )}

                    </div>


                    {/* ACTIONS */}
                    <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">

                      <button
                        type="button"
                        onClick={() => startEditing(job)}
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Edit Job
                      </button>

                      <Link
                        to={`/jobs/${encodeURIComponent(job.title)}`}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                      >
                        View Job
                      </Link>

                      <button
                        type="button"
                        onClick={() => deleteJob(job.id)}
                        disabled={deletingId === job.id}
                        className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === job.id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}


/* INPUT COMPONENT */
function JobInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  )
}

export default AdminJobs