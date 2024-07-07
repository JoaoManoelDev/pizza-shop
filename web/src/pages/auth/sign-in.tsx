import { Helmet } from "react-helmet-async"
import { Link, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { signIn } from "@/api/sign-in"


const signInForm = z.object({
  email: z.string().email(),
})

type SingInForm = z.infer<typeof signInForm>

export const SignIn = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SingInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? ""
    }
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  const handleSignIn = async (data: SingInForm) => {
    await authenticate({ email: data.email })

    toast.success("Enviamos um link de autenticação para o seu e-mail.", {
      action: {
        label: "Reenviar",
        onClick: () => handleSignIn(data)
      }
    })
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button
          asChild
          className="absolute right-8 top-8"
          variant="link"
        >
          <Link to="/sign-up">
            Novo estabelecimento
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                disabled={isSubmitting}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
