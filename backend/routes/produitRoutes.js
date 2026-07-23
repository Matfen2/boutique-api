import { Router } from 'express'
import { getProduits, getProduitById, createProduit, updateProduit, deleteProduit } from '../controllers/produitController.js'
import { validate } from '../middlewares/validate.js'
import { produitSchema } from '../validators/produitValidator.js'

const router = Router()

router.get('/', getProduits)
router.get('/:id', getProduitById)
router.post('/', validate(produitSchema), createProduit)
router.put('/:id', validate(produitSchema), updateProduit)
router.delete('/:id', deleteProduit)

export default router