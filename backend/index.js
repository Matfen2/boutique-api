import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import authRoutes from './routes/authRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import produitRoutes from './routes/produitRoutes.js'
import commandeRoutes from './routes/commandeRoutes.js'
import { authMiddleware } from './middlewares/auth.js'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRoutes)
app.use('/clients', authMiddleware, clientRoutes)
app.use('/produits', authMiddleware, produitRoutes)
app.use('/commandes', authMiddleware, commandeRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`)
  console.log(`Documentation : http://localhost:${process.env.PORT}/api-docs`)
})