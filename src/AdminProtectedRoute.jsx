import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from './supabase.js'

function AdminProtectedRoute({ children }) {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true

    async function checkUser() {
      try {
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser()

        if (!mounted) return

        if (error || !currentUser) {
          setUser(null)
        } else {
          setUser(currentUser)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error checking admin authentication:', error)

        if (!mounted) return

        setUser(null)
        setLoading(false)
      }
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return

        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  /*
    Show loading screen while Supabase checks
    whether the admin is logged in.
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
    IMPORTANT:
    Always redirect to the correct route:
    /admin/login

    NOT:
    /adminlogin
  */
  if (!user) {
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
    User is authenticated,
    so allow access to the protected admin page.
  */
  return children
}

export default AdminProtectedRoute