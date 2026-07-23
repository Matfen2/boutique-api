import { Router } from 'express'
import { getClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientController.js'
import { validate } from '../middlewares/validate.js'
import { clientSchema } from '../validators/clientValidator.js'

const router = Router()

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des clients
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/', getClients)

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Récupérer un client par id
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client introuvable
 */
router.get('/:id', getClientById)

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Créer un client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, email]
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Alice Martin
 *               ville:
 *                 type: string
 *                 example: Paris
 *               email:
 *                 type: string
 *                 example: alice@mail.com
 *     responses:
 *       201:
 *         description: Client créé
 *       400:
 *         description: Données invalides
 */
router.post('/', validate(clientSchema), createClient)

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Modifier un client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               ville:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client modifié
 *       404:
 *         description: Client introuvable
 */
router.put('/:id', validate(clientSchema), updateClient)

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client supprimé
 *       404:
 *         description: Client introuvable
 */
router.delete('/:id', deleteClient)

export default router