import { RouterProvider } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { QueryClientProvider } from "@tanstack/react-query"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { queryClient } from "@/lib/react-query"

import { router } from "@/routes"

export const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
