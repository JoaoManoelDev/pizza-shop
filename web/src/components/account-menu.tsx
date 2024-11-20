import { useMutation, useQuery } from "@tanstack/react-query"

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
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { StoreProfileDialog } from "./store-profile-dialog"
import { signOut } from "@/api/sign-out"
import { useNavigate } from "react-router-dom"

export const AccountMenu = () => {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Infinity
    })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    }
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="flex items-center gap-2 select-none">
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
          
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <Icons.building className="w-4 h-4 mr-2" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="text-rose-500 focus:text-rose-500 w-full cursor-pointer"
            asChild
            disabled={isSigningOut}
          >
            <button onClick={() => signOutFn()}>
              <Icons.logOut className="w-4 h-4 mr-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
