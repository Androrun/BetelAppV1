import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js"; 
import patientRoutes from "./routes/patient.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import hospitalizationRoutes from "./routes/hospitalization.routes.js";
import hospedajeRoutes from "./routes/hospedaje.routes.js"; 

import { isAuth, isAdmin, isVeterinarian, isAdminOrVeterinarian } from "./middlewares/auth.middleware.js";

const app = express();

// Configura CORS para permitir todos los orígenes temporalmente
app.use(cors({
  origin: '*', // Permite todos los orígenes
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas públicas
app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));
app.use("/api", authRoutes);

// Rutas protegidas
app.use("/api/admin", isAuth, isAdmin, adminRoutes);
app.use("/api/veterinario", isAuth, isAdminOrVeterinarian, clientRoutes, patientRoutes, hospitalizationRoutes, hospedajeRoutes); 

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
