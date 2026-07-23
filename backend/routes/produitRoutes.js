import { Router } from 'express'
import { getProduits, getProduitById, createProduit, updateProduit, deleteProduit } from '../controllers/produitController.js'

const router = Router()

router.get('/', getProduits)
router.get('/:id', getProduitById)
router.post('/', createProduit)
router.put('/:id', updateProduit)
router.delete('/:id', deleteProduit)

export default router