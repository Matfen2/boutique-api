import * as Commande from '../models/commandeModel.js'

export const getCommandes = async (req, res) => {
  try {
    res.json(await Commande.findAll())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
    if (!commande) return res.status(404).json({ error: 'Commande introuvable' })
    res.json(commande)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createCommande = async (req, res) => {
  try {
    const commande = await Commande.create(req.body)
    res.status(201).json(commande)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteCommande = async (req, res) => {
  try {
    await Commande.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}