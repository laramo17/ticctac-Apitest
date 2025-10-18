
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "../../tokens.json"); //stockage des tokens
const DAILY_LIMIT = 80000;// Limite de mots par token

interface TokenRecord {
  token: string;
  email: string;
  createdAt: string;
  usage: Record<string, number>;
}

function loadTokens(): TokenRecord[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data) as TokenRecord[];
  } catch {
    return [];
  }
}

function saveTokens(tokens: TokenRecord[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(tokens, null, 2));
}

export function createToken(email: string, token: string): TokenRecord {
  const tokens = loadTokens();
  const newToken: TokenRecord = {
    token,
    email,
    createdAt: new Date().toISOString(),
    usage: {},
  };
  tokens.push(newToken);
  saveTokens(tokens);
  return newToken;
}

export function getToken(token: string): TokenRecord | undefined {
  return loadTokens().find((t) => t.token === token);
}

export function incrementUsage(token: string, wordCount: number): boolean {
  const tokens = loadTokens();
  const index = tokens.findIndex((t) => t.token === token);
  if (index === -1) return false;
  const record = tokens[index]; 
  if (!record) return false; 
  const today = new Date().toISOString().slice(0, 10);
  const used = record.usage[today] || 0;

  if (used + wordCount > DAILY_LIMIT) return false;
  record.usage[today] = used + wordCount;
  tokens[index] = record;
  saveTokens(tokens);
  return true;
}