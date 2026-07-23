import { Router } from 'express'
import { getCommandes, getCommandeById, createCommande, deleteCommande } from '../controllers/commandeController.js'
import { validate } from '../middlewares/validate.js'
import { commandeSchema } from '../validators/commandeValidator.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Commandes
 *   description: Gestion des commandes
 */

/**
 * @swagger
 * /commandes:
 *   get:
 *     summary: Récupérer toutes les commandes (avec JOIN clients et produits)
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes enrichies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   client:
 *                     type: string
 *                     example: Alice Martin
 *                   produit:
 *                     type: string
 *                     example: iPhone 15
 *                   quantite:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/', getCommandes)

/**
 * @swagger
 * /commandes/{id}:
 *   get:
 *     summary: Récupérer une commande par id
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant de la commande
 *     responses:
 *       200:
 *         description: Commande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 client:
 *                   type: string
 *                 produit:
 *                   type: string
 *                 quantite:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Commande introuvable
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/:id', getCommandeById)

/**
 * @swagger
 * /commandes:
 *   post:
 *     summary: Créer une commande
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client_id, produit_id]
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               produit_id:
 *                 type: integer
 *                 example: 2
 *               quantite:
 *                 type: integer
 *                 default: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Commande créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 client_id:
 *                   type: integer
 *                 produit_id:
 *                   type: integer
 *                 quantite:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 */
router.post('/', validate(commandeSchema), createCommande)

/**
 * @swagger
 * /commandes/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Commandes]
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
 *         description: Commande supprimée
 *       404:
 *         description: Commande introuvable
 *       401:
 *         description: Token manquant ou invalide
 */
router.delete('/:id', deleteCommande)

export default router