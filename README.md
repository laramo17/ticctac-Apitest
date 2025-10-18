# TicTac - API de justification de texte

## Description
Ce projet contient une API REST qui permet de justifier un texte passé en paramètre.  
Elle est développée en Node.js avec TypeScript.  

L’API inclut :  
- Un endpoint pour générer un  token unique (`/api/token`)  
- Un endpoint pour justifier un texte (`/api/justify`) avec authentification par token  
- Une limite quotidienne de **80 000 mots par token**, renvoyant `402 Payment Required` si dépassée  

## Prérequis
- Node.js v18 ou supérieur
- npm

---

## Installation

1. Cloner le repo :
```bash
git clone https://github.com/laramo17/ticctac-Apitest
cd tictac

```
2.Installer les dépendances :
npm install

3.Compiler le projet TypeScript :
npx tsc

4. Lancer le serveur :
node dist/index.js


