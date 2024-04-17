import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const AccountMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="iconMd" className="flex items-center gap-2 select-none">
          <Icons.chevronRight className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>João Manoel</span>
          <span className="text-xs font-normal text-muted-foreground">joao@gmail.com</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Icons.building className="w-4 h-4 mr-2" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-500 focus:text-rose-500">
          <Icons.logOut className="w-4 h-4 mr-2" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
