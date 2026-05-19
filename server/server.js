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
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: "https://portfolio-beta-hazel-94.vercel.app",
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
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

/* =========================
   SERVER PORT
========================= */

const PORT = process.env.PORT || 5001;

/* =========================
   START SERVER
========================= */

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   PORT ERROR HANDLER
========================= */

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