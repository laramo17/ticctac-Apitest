# 📖 TicTacTrip - Justify API Documentation

Bienvenue sur la documentation de **TicTacTrip Justify API**, une API REST en **Node.js / TypeScript** qui justifie un texte à une largeur fixe de **80 caractères par ligne**.

> 🟢 Dans le cadre de ce projet technique, **j’ai déployé cette API sur un lien public Replit** afin de la rendre accessible en ligne, conformément aux consignes du test.

---

## 🚀 Démarrage Rapide

### 🔧 Installation

```bash
git clone https://github.com/laramo17/ticctac-Apitest.git
cd ticctac-Apitest
npm install
npx tsc
node dist/index.js
```
Le serveur démarre sur :
👉 http://localhost:3000

💡 Utilisation Simple
1️⃣ Obtenir un token
bash
Copy code
```
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```
Réponse :

json
Copy code
{"token": "abc123xyz"}
2️⃣ Justifier du texte
bash
Copy code
```
curl -X POST http://localhost:3000/api/justify \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: text/plain" \
  -d "Votre texte à justifier ici"
```
Réponse :
Texte justifié (chaque ligne fait exactement 80 caractères).

📡 Endpoints
POST /api/token
Génère un token d’authentification unique à partir d’un email.

Body :

json
Copy code
{"email": "dimitri.tictactrip@example.com"}
Réponse :

json
Copy code
{"token": "tictac123ercerc8ctr55gfr45fr5c4fr55fc5r4"}
POST /api/justify
Justifie un texte selon une largeur de 80 caractères.

Headers :

pgsql
Copy code
Authorization: Bearer <token>
Content-Type: text/plain
Body :

nginx
Copy code
Ceci est un texte à justifier.
Réponse :
Texte justifié.

Limite : 80 000 mots / jour / token
Si dépassé : 402 Payment Required

🔀 Routes
Les routes principales exposées par l'API :

POST /api/token → token.route.ts → token.controller.ts

POST /api/justify → justify.route.ts → justify.controller.ts

Chaque route utilise le contrôleur correspondant et, pour /api/justify, le middleware d’authentification est appliqué (vérifie la présence et validité du token).

🛡 Middleware
Middleware inclus dans le projet :

auth.middleware.ts

Vérifie l’en-tête Authorization: Bearer <token>.

Cherche le token via getToken() dans Limiter.ts.

Si le token est valide : attache (req as any).token = <token> et appelle next().

Sinon : renvoie 401 Unauthorized.

body parsers (configurés dans index.ts)

express.json() → pour parser le body JSON (/api/token)

express.text() → pour parser le body texte brut (/api/justify)

🏗️ Structure du Projet
bash
Copy code
```
src/
├── index.ts                     # Point d'entrée du serveur
├── routes/
│   ├── token.route.ts           # Monte POST /api/token
│   └── justify.route.ts         # Monte POST /api/justify
├── controllers/
│   ├── token.controller.ts      # Logique pour /api/token
│   └── justify.controller.ts    # Logique pour /api/justify
├── services/
│   └── justify.service.ts       # Algorithme de justification
├── utils/
│   └── Limiter.ts               # Gestion des tokens & limites journalières
├── middlewares/
│   └── auth.middleware.ts       # Vérification token
tokens.json                       # Stockage local des tokens (généré au runtime)
tsconfig.json                     # Configuration TypeScript
package.json                      # Dépendances et scripts
README.md                         # Documentation
```
🔐 Sécurité & Limites
Rate Limiting
Limite : 80 000 mots / jour / token

Reset : tous les jours à 00:00 UTC

Calcul : nombre de mots envoyés dans /api/justify

Authentification
Token unique généré par /api/token (par email)

Format : Authorization: Bearer <token>

🧮 Fonctionnement de la Justification
Découpage du texte en mots.

Construction de lignes jusqu’à 80 caractères.

Répartition équitable des espaces entre les mots (sauf la dernière ligne).

La dernière ligne est alignée à gauche.

Exemple :
Entrée : "Hello world this is a test"
Sortie :

kotlin
Copy code
Hello          world          this          is          a          test
🧪 Tests
bash
Copy code
# Lancer les tests
npm test

# Avec couverture
npm run test:coverage
Objectif recommandé : 80 % de couverture.

🧾 Codes d’Erreur
Code	Signification	Cause
200	OK	Succès
400	Bad Request	Email ou texte invalide
401	Unauthorized	Token manquant ou invalide
402	Payment Required	Limite de 80 000 mots atteinte
404	Not Found	Mauvais endpoint

💡 Exemples de Code
JavaScript
js
Copy code
// 1. Obtenir un token
const res = await fetch('http://localhost:3000/api/token', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'user@example.com'})
});
const { token } = await res.json();

// 2. Justifier le texte
const justifyRes = await fetch('http://localhost:3000/api/justify', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'text/plain'
  },
  body: 'Mon texte à justifier'
});
console.log(await justifyRes.text());
Python
python
Copy code
import requests

# 1. Obtenir un token
r = requests.post('http://localhost:3000/api/token', json={'email': 'user@example.com'})
token = r.json()['token']

# 2. Justifier du texte
r = requests.post('http://localhost:3000/api/justify',
                  headers={'Authorization': f'Bearer {token}', 'Content-Type': 'text/plain'},
                  data='Mon texte à justifier')
print(r.text)
🚢 Déploiement
🌍 Déploiement Public (Replit)
Ce projet a été déployé sur Replit, plateforme gratuite ne nécessitant pas de carte bancaire.
👉 Lien public : https://e883dd57-847c-4399-82df-c2cbbe92958e-00-ny7t2kw0o2g1.picard.replit.dev

Cela permet de tester directement l’API en ligne (ex. via Postman ou curl).

❓ FAQ
Q : Puis-je générer plusieurs tokens par email ?
R : Non, chaque appel à /api/token crée un token unique par adresse mail.

Q : Que se passe-t-il après 80 000 mots ?
R : L’API renvoie 402 Payment Required. Le compteur se réinitialise chaque jour à minuit.

Q : Pourquoi tokens.json ?
R : C’est un moyen simple de persister les tokens localement.
En production, on utiliserait une base de données (PostgreSQL, Redis, etc.).

🧾 Informations du Projet
Langage : Node.js → TypeScript

Justification : implémentée sans bibliothèque externe

Stockage local : tokens.json

Déploiement : Replit (lien public)

Repo GitHub : https://github.com/laramo17/ticctac-Apitest
