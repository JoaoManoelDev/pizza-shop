import { api } from "@/lib/axios"

export const signOut = async () => {
  await api.post('/sign-out')
}