import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from './supabase.js'

const AUTHORIZED_ADMIN_EMAILS = new Set([
  'johndarasimi21@gmail.com',
  'oyeomooye444@gmail.com',
])

function AdminProtectedRoute({ children }) {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true

    async function checkAdminAccess() {
      try {
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser()

        if (!mounted) return

        if (error || !currentUser) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        const email = currentUser.email?.trim().toLowerCase() || ''

        const authorized = AUTHORIZED_ADMIN_EMAILS.has(email)

        setUser(currentUser)
        setIsAdmin(authorized)
        setLoading(false)

        if (!authorized) {
          await supabase.auth.signOut()
        }
      } catch (error) {
        console.error('Error checking admin authentication:', error)

        if (!mounted) return

        setUser(null)
        setIsAdmin(false)
        setLoading(false)
      }
    }

    checkAdminAccess()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return

        const currentUser = session?.user ?? null

        if (!currentUser) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        const email = currentUser.email?.trim().toLowerCase() || ''

        const authorized = AUTHORIZED_ADMIN_EMAILS.has(email)

        setUser(currentUser)
        setIsAdmin(authorized)
        setLoading(false)

        if (!authorized) {
          await supabase.auth.signOut()
        }
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  /*
    Show loading screen while Supabase checks
    whether the current user is authenticated
    and authorized as an administrator.
  */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F5] px-4">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E45128]/20 border-t-[#E45128]" />

          <p className="mt-4 text-sm font-medium text-[#1A1816]">
            Checking admin access...
          </p>

        </div>
      </div>
    )
  }

  /*
    Redirect users who are:
    - not logged in, or
    - logged in but not one of the authorized administrators.
  */
  if (!user || !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname + location.search,
        }}
      />
    )
  }

  /*
    User is authenticated and authorized,
    so allow access to the protected admin page.
  */
  return children
}

export default AdminProtectedRoute