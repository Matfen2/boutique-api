import 'dotenv/config'
import express from 'express'
import clientRoutes from './routes/clientRoutes.js'

const app = express()
app.use(express.json())

app.use('/clients', clientRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`)
})