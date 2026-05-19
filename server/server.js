const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const createCrudRouter = require("./utils/crudRouter");
const Project = require("./models/Project");
const Education = require("./models/Education");
const Certification = require("./models/Certification");
const Achievement = require("./models/Achievement");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", createCrudRouter(Project, { slugField: "slug", sectionKey: "projects" }));
app.use("/api/education", createCrudRouter(Education, { sectionKey: "education" }));
app.use("/api/certifications", createCrudRouter(Certification, { sectionKey: "certifications" }));
app.use("/api/achievements", createCrudRouter(Achievement, { sectionKey: "achievements" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is in use. Set PORT=5001 in server/.env (macOS often uses 5000 for AirPlay).`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
