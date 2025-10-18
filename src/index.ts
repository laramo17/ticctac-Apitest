import express from "express";
import tokenRoutes from "./routes/token.route.js";
import justifyRoutes from "./routes/justify.route.js";

const app = express();
const PORT = 3000;

// Parse JSON et texte brut
app.use(express.json());
app.use(express.text());

// Monte les routes
app.use("/api/token", tokenRoutes);       // url/api/token
app.use("/api/justify", justifyRoutes);   // url/api/justify

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
