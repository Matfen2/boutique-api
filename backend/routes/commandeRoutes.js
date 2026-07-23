import { Router } from 'express'
import { getCommandes, getCommandeById, createCommande, deleteCommande } from '../controllers/commandeController.js'
import { validate } from '../middlewares/validate.js'
import { commandeSchema } from '../validators/commandeValidator.js'

const router = Router()

router.get('/', getCommandes)
router.get('/:id', getCommandeById)
router.post('/', validate(commandeSchema), createCommande)
router.delete('/:id', deleteCommande)

export default router