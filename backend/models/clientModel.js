import pool from '../config/db.js'

// Trouver tous les clients
export const findAll = async () => {
  const result = await pool.query('SELECT * FROM clients')
  return result.rows
}

// Trouver un client spécifique
export const findById = async (id) => {
  const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id])
  return result.rows[0]
}

// Créer un client
export const create = async ({ nom, ville, email }) => {
  const result = await pool.query(
    'INSERT INTO clients (nom, ville, email) VALUES ($1, $2, $3) RETURNING *',
    [nom, ville, email]
  )
  return result.rows[0]
}

// Mettre à jour un client
export const update = async (id, { nom, ville, email }) => {
  const result = await pool.query(
    'UPDATE clients SET nom=$1, ville=$2, email=$3 WHERE id=$4 RETURNING *',
    [nom, ville, email, id]
  )
  return result.rows[0]
}

// Supprimer un client
export const remove = async (id) => {
  await pool.query('DELETE FROM clients WHERE id=$1', [id])
}