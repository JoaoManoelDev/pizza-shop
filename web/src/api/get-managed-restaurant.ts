import { api } from "@/lib/axios"

export interface GetManagedRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export const getManagedRestaurant = async () => {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant"
  )
  
  return response.data
}
