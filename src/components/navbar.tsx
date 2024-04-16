import { NavLink } from "@/components/nav-link"
import { Icons } from "@/components/icons"

export const Navbar = () => {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <NavLink to="/">
        <Icons.home className="w-4 h-4" />
        Início
      </NavLink>

      <NavLink to="/orders">
        <Icons.utensilsCrossed className="w-4 h-4" />
        Pedidos
      </NavLink>
    </nav>
  )
}