import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { registerRestaurant } from "@/api/register-restaurant"

const signUpForm = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
})

type SingInForm = z.infer<typeof signUpForm>

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SingInForm>()

  const { mutateAsync: registerNewRestaurant } = useMutation({
    mutationFn: registerRestaurant
  })

  const handleSignUp = async (data: SingInForm) => {
    await registerNewRestaurant({
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      email: data.email,
      phone: data.phone,
    })

    toast.success("Restaurante cadastrado com sucesso.", {
      action: {
        label: "Login",
        onClick: () => navigate(`/sign-in?email=${data.email}`)
      }
    })
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button
          asChild
          className="absolute right-8 top-8"
          variant="link"
        >
          <Link to="/sign-in">
            Fazer login
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                {...register("restaurantName")}
                id="restaurantName"
                type="text"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                {...register("managerName")}
                id="managerName"
                type="text"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                {...register("phone")}
                id="phone"
                type="tel"
                disabled={isSubmitting}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Finalizar cadastro
            </Button>

            <p
              className="px-6 text-center text-sm leading-relaxed
              text-muted-foreground"
            >
              Ao continuar, você concorda com nossos {" "}
              <a className="underline underline-offset-4" href="#">
                termos de serviço
              </a> e {" "}
              <a className="underline underline-offset-4" href="#">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
