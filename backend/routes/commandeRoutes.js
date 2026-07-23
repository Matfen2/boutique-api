import { Router } from 'express'
import { getCommandes, getCommandeById, createCommande, deleteCommande } from '../controllers/commandeController.js'

const router = Router()

router.get('/', getCommandes)
router.get('/:id', getCommandeById)
router.post('/', createCommande)
router.delete('/:id', deleteCommande)

export default router