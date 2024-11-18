import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { Navbar } from "@/components/navbar"
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('sign-in', { replace: true })
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex flex-col min-h-screen antialiased relative">
      <Navbar />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 ml-14">
        <Outlet />
      </div>
    </div>
  )
}
