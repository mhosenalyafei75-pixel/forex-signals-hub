const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Signal = require("./models/Signal");
const { generateSignal } = require("./signalEngine");

const app = express();

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// جلب الإشارات
app.get("/api/signals", async (req, res) => {
  const signals = await Signal.find().sort({ createdAt: -1 });
  res.json(signals);
});

// توليد إشارات تلقائيًا
setInterval(async () => {
  const prices = [1.08, 1.081, 1.082, 1.079, 1.083, 1.084];
  await generateSignal("EURUSD", prices);
}, 60000);

// تشغيل السيرفر
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});