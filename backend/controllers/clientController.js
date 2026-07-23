import * as Client from '../models/clientModel.js'

// Trouver tous les clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll()
    res.json(clients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Trouver un client
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json({ error: 'Client introuvable' })
    res.json(client)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Créer un client
export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body)
    res.status(201).json(client)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Mettre à jour un client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.update(req.params.id, req.body)
    if (!client) return res.status(404).json({ error: 'Client introuvable' })
    res.json(client)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Supprimer un client
export const deleteClient = async (req, res) => {
  try {
    await Client.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}