import { RouterProvider } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme/theme-provider"

import { router } from "@/routes"

export const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
