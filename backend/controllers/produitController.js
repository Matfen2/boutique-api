import * as Produit from '../models/produitModel.js'

export const getProduits = async (req, res) => {
  try {
    res.json(await Produit.findAll())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id)
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' })
    res.json(produit)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createProduit = async (req, res) => {
  try {
    const produit = await Produit.create(req.body)
    res.status(201).json(produit)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateProduit = async (req, res) => {
  try {
    const produit = await Produit.update(req.params.id, req.body)
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' })
    res.json(produit)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteProduit = async (req, res) => {
  try {
    await Produit.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}