import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv'; // Importar dotenv

dotenv.config(); // Cargar las variables de entorno

import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js"; 
import patientRoutes from "./routes/patient.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import hospitalizationRoutes from "./routes/hospitalization.routes.js";
import hospedajeRoutes from "./routes/hospedaje.routes.js"; 

import { isAuth, isAdmin, isVeterinarian, isAdminOrVeterinarian } from "./middlewares/auth.middleware.js";
import { pool } from "./db.js";

const app = express();

app.use(cors({
  origin: '*', // Permitir todos los orígenes temporalmente
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));
app.use("/api", authRoutes);

app.use("/api/admin", isAuth, isAdmin, adminRoutes);
app.use("/api/veterinario", isAuth, isAdminOrVeterinarian, clientRoutes, patientRoutes, hospitalizationRoutes, hospedajeRoutes); 

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;







