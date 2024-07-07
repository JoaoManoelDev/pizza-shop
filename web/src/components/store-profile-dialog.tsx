import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  type GetManagedRestaurantResponse,
  getManagedRestaurant } from "@/api/get-managed-restaurant"
import { updateProfile } from "@/api/update-profile"

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient()

  const { data: managedRestaurant} = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "", 
      description: managedRestaurant?.description ?? ""
    }
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"]
      )

      if (cached) {
        queryClient.setQueryData<GetManagedRestaurantResponse>(
          ["managed-restaurant"],
          {
            ...cached,
            name,
            description
          }
        )
      }
    }
  })

  const handleUpdateProfile = async (data: StoreProfileSchema) => {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      })

      toast.success("Perfil atualizado com sucesso.")
    } catch (error) {
      toast.error("Falha ao atualizar o perfil, tente novamente.")
    }
  }
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis para o seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              {...register("name")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
