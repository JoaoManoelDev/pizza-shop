import { Icons } from "@/components/icons"

import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { NavLink } from "@/components/nav-link"
import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  return (
    <nav className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Icons.pizza className="w-6 h-6" />

          <Separator className="w-6" />

          <div className="flex flex-col gap-4 px-2">
            <Tooltip>
              <TooltipTrigger>
                <NavLink to="/">
                  <Icons.home className="w-5 h-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">dashboard</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Início</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <NavLink to="/orders">
                  <Icons.utensilsCrossed className="w-5 h-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">pizzashop</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Vendas</TooltipContent>
            </Tooltip>

          </div>
        </div>

        <div className="flex flex-col items-center gap-4 px-2 sm:py-5 mt-auto">
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent side="right">Alternar Tema</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </nav>
  )
}
