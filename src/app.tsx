import { RouterProvider } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"

import { Toaster } from "@/components/ui/sonner"

import { router } from "./routes"

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza Shop" />
      <Toaster />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
