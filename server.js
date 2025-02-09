const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();
const AuthRoutes = require("./routes/AuthRoutes");
const CardRoutes = require("./routes/CardRoutes");

const app = express();
dotenv.config();

// CORS ayarları
const corsOptions = {
  origin: "*",  // Bu ayar, herhangi bir kaynaktan gelen istekleri kabul eder
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // 10MB'lik limit belirler

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.use("/auth", AuthRoutes);
app.use("/card", CardRoutes);

const PORT = process.env.PORT || 5000;  // PORT'u kontrol et
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
