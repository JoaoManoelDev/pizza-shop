import { api } from "@/lib/axios"

export interface SignInBody {
  email: string
}

export const signIn = async ({ email }: SignInBody) => {
  await api.post("authenticate", { email })
}
