import { z } from 'zod'

export const commandeSchema = z.object({
  client_id: z.number().int().positive(),
  produit_id: z.number().int().positive(),
  quantite: z.number().int().positive().default(1),
})