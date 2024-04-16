import { Outlet } from "react-router-dom"

import { Icons } from "@/components/icons"

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Icons.pizza className="w-5 h-5" />
          <span className="font-semibold">Pizza Shop</span>
        </div>

        <footer className="text-sm">
          Painel do parceiro &copy; pizza shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}