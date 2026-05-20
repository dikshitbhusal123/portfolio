const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

/* =========================
   IMPORT ROUTES
========================= */

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

/* =========================
   IMPORT CRUD ROUTER
========================= */

const createCrudRouter = require("./utils/crudRouter");

/* =========================
   IMPORT MODELS
========================= */

const Project = require("./models/Project");
const Education = require("./models/Education");
const Certification = require("./models/Certification");
const Achievement = require("./models/Achievement");

/* =========================
   APP INIT
========================= */

const app = express();

/* =========================
   CORS — configurable for Vercel / multiple frontends
   Set on Render:
   - CORS_ORIGINS=https://your-prod.vercel.app,https://your-preview.vercel.app
   - CORS_ALLOW_VERCEL_PREVIEWS=true (optional: any https host ending .vercel.app)
========================= */

function getCorsAllowedOrigins() {
  const fromEnv = process.env.CORS_ORIGINS || "";
  const extras = fromEnv.split(",").map((s) => s.trim()).filter(Boolean);

  const defaults = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  if (!extras.length) {
    extras.push("https://portfolio-beta-hazel-94.vercel.app");
  }

  return [...new Set([...defaults, ...extras])];
}

const corsAllowedOrigins = getCorsAllowedOrigins();

function isHttpsVercelAppOrigin(origin) {
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (corsAllowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      const allowPreview =
        String(process.env.CORS_ALLOW_VERCEL_PREVIEWS || "").toLowerCase() ===
        "true";
      if (allowPreview && isHttpsVercelAppOrigin(origin)) {
        callback(null, true);
        return;
      }
      console.warn(`[cors] blocked origin: ${origin}`);
      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

/* =========================
   AUTH ROUTES
========================= */

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

/* =========================
   API ROUTES
========================= */

app.use("/api/messages", messageRoutes);

app.use(
  "/api/projects",
  createCrudRouter(Project, {
    slugField: "slug",
    sectionKey: "projects",
  })
);

app.use(
  "/api/education",
  createCrudRouter(Education, {
    sectionKey: "education",
  })
);

app.use(
  "/api/certifications",
  createCrudRouter(Certification, {
    sectionKey: "certifications",
  })
);

app.use(
  "/api/achievements",
  createCrudRouter(Achievement, {
    sectionKey: "achievements",
  })
);

/* =========================
   DATABASE + SERVER START
   Connect before listen so inserts are not buffered on a dead connection.
========================= */

const PORT = process.env.PORT || 5001;

async function start() {
  const uri = process.env.MONGO_URI?.trim();
  if (!uri) {
    console.error("MONGO_URI is missing. Set it in server/.env (local) or Render env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15_000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "Check MONGO_URI, Atlas cluster is running, and Network Access allows your host (e.g. 0.0.0.0/0 for Render)."
    );
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use.
Set PORT=5001 in server/.env
(macOS often uses 5000 for AirPlay Receiver).`
      );
    } else {
      console.error(err);
    }

    process.exit(1);
  });
}

start();