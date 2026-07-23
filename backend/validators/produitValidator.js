import { z } from 'zod'

export const produitSchema = z.object({
  nom: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  categorie: z.string().optional(),
  prix: z.number().positive('Le prix doit être positif'),
})