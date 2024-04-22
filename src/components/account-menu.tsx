import { useQuery } from "@tanstack/react-query"

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
import { getProfile } from "@/api/get-profile"
import { getManagedRestaurant } from "@/api/get-managed-restaurant"


export const AccountMenu = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="iconMd" className="flex items-center gap-2 select-none">
          <Icons.store className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="end" className="w-56">
        <p className="text-xl text-center font-bold">{managedRestaurant?.name}</p>
          
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="flex flex-col">
          <span>{profile?.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {profile?.email}
          </span>
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
