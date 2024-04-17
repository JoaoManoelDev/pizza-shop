import { Outlet } from "react-router-dom"

import { Navbar } from "@/components/navbar"
import { Header } from "@/components/header"

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen antialiased relative">
      <Navbar />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 ml-14">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
