import { Link, LinkProps, useLocation } from "react-router-dom"

export type NavLinkProps = LinkProps

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation()
  
  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="group flex h-9 w-9 items-center justify-center text-sm
      font-medium text-muted-foreground hover:text-foreground transition-colors
      data-[current=true]:text-foreground data-[current=true]:bg-muted-foreground/15
      rounded-lg"
    /> 
  )
}
