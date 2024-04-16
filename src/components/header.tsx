import { Icons } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Separator } from "@/components/ui/separator"

export const Header = () => {
  return (
    <header className="border-b">
      <div className="h-16 flex items-center gap-6 px-6">
        <Icons.pizza className="w-6 h-6" />

        <Separator orientation="vertical" className="h-6" />

        <Navbar />
      </div>
    </header>
  )
}
