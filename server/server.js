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
   CORS — reflect request Origin (works with localhost, Vercel previews, production)
========================= */

app.use(
  cors({
    origin: true,
    credentials: true,
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