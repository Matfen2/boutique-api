# boutique-api

API REST Node.js + PostgreSQL avec authentification JWT, validation des données et architecture MVC.

---

## Stack technique

- **Runtime** : Node.js v25+ (ES Modules)
- **Framework** : Express.js
- **Base de données** : PostgreSQL (via `pg`)
- **Authentification** : JSON Web Token (`jsonwebtoken`) + hachage (`bcrypt`)
- **Validation** : Zod
- **Variables d'environnement** : dotenv
- **Documentation** : Swagger UI (`swagger-ui-express` + `swagger-jsdoc`)

---

## Architecture

```
boutique-api/
├── config/
│   ├── db.js                  # Connexion PostgreSQL (Pool)
│   └── swagger.js             # Configuration Swagger / OpenAPI 3.0
├── controllers/
│   ├── authController.js      # Register / Login
│   ├── clientController.js
│   ├── produitController.js
│   └── commandeController.js
├── middlewares/
│   ├── auth.js                # Vérification du token JWT
│   └── validate.js            # Middleware de validation Zod
├── models/
│   ├── utilisateurModel.js
│   ├── clientModel.js
│   ├── produitModel.js
│   └── commandeModel.js
├── routes/
│   ├── authRoutes.js
│   ├── clientRoutes.js
│   ├── produitRoutes.js
│   └── commandeRoutes.js
├── validators/
│   ├── authValidator.js
│   ├── clientValidator.js
│   ├── produitValidator.js
│   └── commandeValidator.js
├── .env                       # Variables d'environnement (non commité)
├── .env.example               # Modèle de configuration
├── .gitignore
├── index.js                   # Point d'entrée
└── package.json
```

---

## Installation

### Prérequis

- Node.js >= 18
- PostgreSQL installé et démarré

### Étapes

```bash
# Cloner le projet
git clone https://github.com/Matfen2/boutique-api.git
cd boutique-api

# Installer les dépendances
npm install

# Installer Swagger (si pas déjà fait)
npm install swagger-ui-express swagger-jsdoc

# Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Démarrer le serveur
npm start
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine en se basant sur `.env.example` :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boutique
DB_USER=postgres
DB_PASSWORD=ton_mot_de_passe
PORT=3000
JWT_SECRET=ton_secret_jwt_long_et_complexe
```

Pour générer un `JWT_SECRET` sécurisé :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Base de données

Exécuter ce script dans pgAdmin (Query Tool) sur la base `boutique` :

```sql
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  ville VARCHAR(100),
  email VARCHAR(150) UNIQUE
);

CREATE TABLE produits (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  categorie VARCHAR(50),
  prix NUMERIC(10,2)
);

CREATE TABLE commandes (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  produit_id INT REFERENCES produits(id),
  quantite INT DEFAULT 1,
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE utilisateurs (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

---

## Endpoints

### Authentification (public)

| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Se connecter, reçoit un token JWT |

**Body attendu :**
```json
{
  "email": "user@mail.com",
  "password": "motdepasse123"
}
```

**Réponse login :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Routes protégées

Toutes les routes ci-dessous nécessitent un header `Authorization` :

```
Authorization: Bearer <token>
```

#### Clients

| Méthode | Route | Description |
|---|---|---|
| GET | `/clients` | Récupérer tous les clients |
| GET | `/clients/:id` | Récupérer un client par id |
| POST | `/clients` | Créer un client |
| PUT | `/clients/:id` | Modifier un client |
| DELETE | `/clients/:id` | Supprimer un client |

**Body POST/PUT :**
```json
{
  "nom": "Alice Martin",
  "ville": "Paris",
  "email": "alice@mail.com"
}
```

#### Produits

| Méthode | Route | Description |
|---|---|---|
| GET | `/produits` | Récupérer tous les produits |
| GET | `/produits/:id` | Récupérer un produit par id |
| POST | `/produits` | Créer un produit |
| PUT | `/produits/:id` | Modifier un produit |
| DELETE | `/produits/:id` | Supprimer un produit |

**Body POST/PUT :**
```json
{
  "nom": "MacBook Pro",
  "categorie": "Informatique",
  "prix": 1999.00
}
```

#### Commandes

| Méthode | Route | Description |
|---|---|---|
| GET | `/commandes` | Récupérer toutes les commandes (avec JOIN clients/produits) |
| GET | `/commandes/:id` | Récupérer une commande par id |
| POST | `/commandes` | Créer une commande |
| DELETE | `/commandes/:id` | Supprimer une commande |

**Body POST :**
```json
{
  "client_id": 1,
  "produit_id": 2,
  "quantite": 1
}
```

---

## Validation

Les routes POST et PUT sont protégées par des schémas Zod. En cas de données invalides, l'API retourne un `400 Bad Request` :

```json
{
  "error": "Données invalides",
  "details": [
    { "champ": "email", "message": "Email invalide" },
    { "champ": "nom", "message": "Le nom doit faire au moins 2 caractères" }
  ]
}
```

---

## Flux d'une requête

```
Requête HTTP
    ↓
authMiddleware (vérification JWT)
    ↓
validate(schema) (validation Zod)
    ↓
Controller (logique métier)
    ↓
Model (requête SQL via pg)
    ↓
PostgreSQL
    ↓
Réponse JSON
```

---

## Documentation Swagger

La documentation interactive est disponible à l'adresse suivante après démarrage du serveur :

```
http://localhost:3000/api-docs
```

### Tester une route protégée dans Swagger

1. Lancer le serveur : `npm start`
2. Ouvrir `http://localhost:3000/api-docs`
3. Appeler `POST /auth/login` pour obtenir un token JWT
4. Cliquer sur **Authorize** (en haut à droite) et coller le token
5. Toutes les routes protégées enverront automatiquement le header `Authorization: Bearer <token>`

### Routes documentées

| Tag | Méthodes |
|---|---|
| **Auth** | POST /auth/register, POST /auth/login |
| **Clients** | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| **Produits** | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| **Commandes** | GET, GET/:id, POST, DELETE/:id |

---

## Auteur

**Mathieu FENOUIL** - Développeur Full-Stack  
[GitHub](https://github.com/Matfen2) · [LinkedIn](https://www.linkedin.com/in/mathieu-fenouil-développeur-full-stack/)