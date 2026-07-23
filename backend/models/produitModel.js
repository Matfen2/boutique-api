import pool from '../config/db.js'

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM produits')
  return result.rows
}

export const findById = async (id) => {
  const result = await pool.query('SELECT * FROM produits WHERE id = $1', [id])
  return result.rows[0]
}

export const create = async ({ nom, categorie, prix }) => {
  const result = await pool.query(
    'INSERT INTO produits (nom, categorie, prix) VALUES ($1, $2, $3) RETURNING *',
    [nom, categorie, prix]
  )
  return result.rows[0]
}

export const update = async (id, { nom, categorie, prix }) => {
  const result = await pool.query(
    'UPDATE produits SET nom=$1, categorie=$2, prix=$3 WHERE id=$4 RETURNING *',
    [nom, categorie, prix, id]
  )
  return result.rows[0]
}

export const remove = async (id) => {
  await pool.query('DELETE FROM produits WHERE id=$1', [id])
}