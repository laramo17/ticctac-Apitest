# 🧾 API Justify Text – Node.js & TypeScript

## 🎯 Objectif

Implémenter et déployer une **API REST** qui justifie un texte passé en paramètre.

Le but est de produire un texte où chaque ligne contient **exactement 80 caractères**, en ajoutant des espaces supplémentaires entre les mots si nécessaire (comme dans les traitements de texte).

---

## 🛠️ Stack technique

- **Node.js**
- **TypeScript**
- **Express.js**
- **Middleware personnalisé**
- **Routes séparées**
- **Déploiement sur Replit (gratuit et sans carte bancaire)**

---

## ⚙️ Installation et exécution locale

1️⃣ **Installer les dépendances**

npm install
2️⃣ Compiler le code TypeScript

bash
Copy code
npx tsc
3️⃣ Lancer le serveur

bash
Copy code
node dist/index.js
Le serveur démarre ensuite sur :
👉 http://localhost:3000

🧩 Endpoint principal
POST /api/justify
📥 Corps de la requête :
json
Copy code
{
  "text": "Le texte à jusifier"
}
📤 Réponse :
Texte justifié avec des lignes de 80 caractères chacune.

🔒 Middleware
L’API utilise un **middleware d’authentification** pour sécuriser l’accès à l’endpoint `/api/justify`

## 🏗️ Structure du Projet

```bash
project/
│
├── src/
│   ├── index.ts                # Point d’entrée principal
│   ├── routes/
│   │   └── justifyRoute.ts     # Définit la route /api/justify
│   ├── controllers/
│   │   ├── token.controller.ts      # Logique pour /api/token
│   │   └── justify.controller.ts    # Logique pour /api/justify
│   ├── middleware/
│   │   └── justifyMiddleware.ts     # Gère la logique d’authentification
│   └── utils/
│       └── justifyText.ts           # Fonction principale pour formater le texte
│
├── package.json
├── tsconfig.json
└── README.md
```
🧪 Bonus et qualité
Ils sont presque obligatoires pour te démarquer :

✅ Tests unitaires (si ajoutés ultérieurement)
✅ Code clair et bien commenté
✅ Commits propres et explicites
✅ Documentation lisible et structurée

🌐 Déploiement en ligne
Dans le cadre de ce projet, j’ai déployé l’API sur une URL publique afin qu’elle soit accessible et testable en ligne sans installation locale.

🔗 Lien public du déploiement :
👉 https://e883dd57-847c-4399-82df-c2cbbe92958e-00-ny7t2kw0o2g1.picard.replit.dev

Cette URL pointe vers le serveur Node.js hébergeant l’API REST de justification de texte.

⚙️ Stack technique utilisée :
TypeScript

Node.js

Express.js

Middleware personnalisé (validation de token, formatage du texte)

Routes bien structurées (/api/justify)

Déploiement via Replit
