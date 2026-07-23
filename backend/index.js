import 'dotenv/config'
import express from 'express'
import clientRoutes from './routes/clientRoutes.js'
import produitRoutes from './routes/produitRoutes.js'
import commandeRoutes from './routes/commandeRoutes.js'

const app = express()
app.use(express.json())

app.use('/clients', clientRoutes)
app.use('/produits', produitRoutes)
app.use('/commandes', commandeRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`)
})