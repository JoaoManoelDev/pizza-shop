import { api } from "@/lib/axios"

interface UpdateProfileBody {
  name: string
  description: string | null
}

export const updateProfile = async ({
  name,
  description
}: UpdateProfileBody) => {
  await api.put("/profile", { name, description })
}
