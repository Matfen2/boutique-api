import pool from '../config/db.js'

export const findAll = async () => {
  const result = await pool.query(`
    SELECT commandes.id, clients.nom AS client, produits.nom AS produit,
           commandes.quantite, commandes.date
    FROM commandes
    INNER JOIN clients ON commandes.client_id = clients.id
    INNER JOIN produits ON commandes.produit_id = produits.id
    ORDER BY commandes.date DESC
  `)
  return result.rows
}

export const findById = async (id) => {
  const result = await pool.query(`
    SELECT commandes.id, clients.nom AS client, produits.nom AS produit,
           commandes.quantite, commandes.date
    FROM commandes
    INNER JOIN clients ON commandes.client_id = clients.id
    INNER JOIN produits ON commandes.produit_id = produits.id
    WHERE commandes.id = $1
  `, [id])
  return result.rows[0]
}

export const create = async ({ client_id, produit_id, quantite }) => {
  const result = await pool.query(
    'INSERT INTO commandes (client_id, produit_id, quantite) VALUES ($1, $2, $3) RETURNING *',
    [client_id, produit_id, quantite]
  )
  return result.rows[0]
}

export const remove = async (id) => {
  await pool.query('DELETE FROM commandes WHERE id=$1', [id])
}