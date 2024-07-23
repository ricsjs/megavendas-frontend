import { api } from "@/services/api";

export const fetchGroupsData = async (userId: string) => {
  const response = await api.get(`groups/${userId}`);
  return response.data;
}

export const deleteGroup = async (id: string) => {
  const response = await api.delete(`/groups/${id}`);
  return response.data;
}