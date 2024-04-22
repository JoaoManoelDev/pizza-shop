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
import { Skeleton } from "@/components/ui/skeleton"

export const AccountMenu = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
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

        {isLoadingManagedRestaurant ? (
          <Skeleton className="mx-auto w-40 h-6 my-2" />
        ) : (
          <p className="text-xl text-center font-bold">
            {managedRestaurant?.name}
          </p>
        )}

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <div className="space-y-1.5">
              <Skeleton className="w-32 h-3" />
              <Skeleton className="w-24 h-2" />
            </div>
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
            </>
          )}

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
