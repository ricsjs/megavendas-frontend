import { api } from "@/services/api";
import { CreateGroupRequest } from "./types";

export const fetchGroupsData = async (userId: string) => {
  const response = await api.get(`groups/${userId}`);
  return response.data;
}

export const deleteGroup = async (id: string) => {
  const response = await api.delete(`/groups/${id}`);
  return response.data;
}

export const createGroup = async (groupBody: CreateGroupRequest) => {
  const response = await api.post("/groups", groupBody);
  return response.data;
};