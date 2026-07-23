import { Router } from 'express'
import { getClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientController.js'
import { validate } from '../middlewares/validate.js'
import { clientSchema } from '../validators/clientValidator.js'

const router = Router()

router.get('/', getClients)
router.get('/:id', getClientById)
router.post('/', validate(clientSchema), createClient)
router.put('/:id', validate(clientSchema), updateClient)
router.delete('/:id', deleteClient)

export default router