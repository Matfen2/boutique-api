import { z } from 'zod'

export const clientSchema = z.object({
  nom: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  ville: z.string().optional(),
  email: z.string().email('Email invalide'),
})