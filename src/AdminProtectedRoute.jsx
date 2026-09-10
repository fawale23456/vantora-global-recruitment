import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from './supabase.js'

// ============================================================
// AUTHORIZED VANTORA ADMINISTRATORS
// ============================================================
// Add every email address that is allowed to access the
// administration dashboard.
const AUTHORIZED_ADMIN_EMAILS = new Set([
  'johndarasimi21@gmail.com',
  'oyeomooye444@gmail.com',
  'support@vantoraglobalrecruitments.com',
])

function AdminProtectedRoute({ children }) {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true

    // ----------------------------------------------------------
    // Check the currently logged-in Supabase user
    // ----------------------------------------------------------
    async function checkAdminAccess() {
      try {
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser()

        if (!mounted) return

        // No authenticated user
        if (error || !currentUser) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        // Normalize email before checking authorization
        const email =
          currentUser.email?.trim().toLowerCase() || ''

        const authorized =
          AUTHORIZED_ADMIN_EMAILS.has(email)

        if (authorized) {
          // Authorized administrator
          setUser(currentUser)
          setIsAdmin(true)
        } else {
          // Authenticated but NOT an administrator
          setUser(null)
          setIsAdmin(false)

          // Sign them out so they cannot remain in
          // an unauthorized Supabase session.
          await supabase.auth.signOut()
        }

        setLoading(false)
      } catch (error) {
        console.error(
          'Error checking admin authentication:',
          error,
        )

        if (!mounted) return

        setUser(null)
        setIsAdmin(false)
        setLoading(false)
      }
    }

    // Run initial authentication check
    checkAdminAccess()

    // ----------------------------------------------------------
    // Listen for Supabase authentication changes
    // ----------------------------------------------------------
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return

        const currentUser = session?.user ?? null

        // User logged out
        if (!currentUser) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        // Normalize email
        const email =
          currentUser.email?.trim().toLowerCase() || ''

        // Check whether this email is an authorized admin
        const authorized =
          AUTHORIZED_ADMIN_EMAILS.has(email)

        if (authorized) {
          setUser(currentUser)
          setIsAdmin(true)
        } else {
          setUser(null)
          setIsAdmin(false)

          // Do not leave unauthorized users authenticated
          supabase.auth.signOut()
        }

        setLoading(false)
      },
    )

    // Cleanup
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // ============================================================
  // LOADING
  // ============================================================
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

  // ============================================================
  // NOT AUTHENTICATED OR NOT AUTHORIZED
  // ============================================================
  if (!user || !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from:
            location.pathname +
            location.search +
            location.hash,
        }}
      />
    )
  }

  // ============================================================
  // AUTHORIZED ADMIN
  // ============================================================
  return children
}

export default AdminProtectedRoute