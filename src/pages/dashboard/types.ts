import { z } from 'zod'

export interface CreateGroupRequest {
  userId: string;
  name: string;
  contacts: Contacts[];
}

interface Contacts {
  name: string;
  phone_number: string;
}

export const createGroupSchema = z.object({
  userId: z.string(),
  name: z.string(),
  contacts: z.string().array(),
});