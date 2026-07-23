import { Router } from 'express'
import { getProduits, getProduitById, createProduit, updateProduit, deleteProduit } from '../controllers/produitController.js'
import { validate } from '../middlewares/validate.js'
import { produitSchema } from '../validators/produitValidator.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * /produits:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   categorie:
 *                     type: string
 *                   prix:
 *                     type: number
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/', getProduits)

/**
 * @swagger
 * /produits/{id}:
 *   get:
 *     summary: Récupérer un produit par id
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du produit
 *     responses:
 *       200:
 *         description: Produit trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 categorie:
 *                   type: string
 *                 prix:
 *                   type: number
 *       404:
 *         description: Produit introuvable
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/:id', getProduitById)

/**
 * @swagger
 * /produits:
 *   post:
 *     summary: Créer un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prix]
 *             properties:
 *               nom:
 *                 type: string
 *                 example: MacBook Pro
 *               categorie:
 *                 type: string
 *                 example: Informatique
 *               prix:
 *                 type: number
 *                 example: 1999.00
 *     responses:
 *       201:
 *         description: Produit créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 */
router.post('/', validate(produitSchema), createProduit)

/**
 * @swagger
 * /produits/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
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
 *                 example: MacBook Pro M3
 *               categorie:
 *                 type: string
 *                 example: Informatique
 *               prix:
 *                 type: number
 *                 example: 2199.00
 *     responses:
 *       200:
 *         description: Produit modifié
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Produit introuvable
 *       401:
 *         description: Token manquant ou invalide
 */
router.put('/:id', validate(produitSchema), updateProduit)

/**
 * @swagger
 * /produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
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
 *         description: Produit supprimé
 *       404:
 *         description: Produit introuvable
 *       401:
 *         description: Token manquant ou invalide
 */
router.delete('/:id', deleteProduit)

export default router