const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Node.js + MongoDB API is running...");
});

// ⭐ CREATE User
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ GET all Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ GET single user
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ UPDATE user
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ DELETE user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products', (req, res) => {
    res.send('hello hansika , student at university of moratuwa ');
});
app.get('/api/hashz', (req, res) => {
    res.send('hello hansika , hello rukmal ');
});
app.get('/api/tash', (req, res) => {
    res.send('You know why I like talking to you, Taniya,Because it burns calories…Laughing at your nonsense!');
});

 
app.get('/api/buddi', (req, res) => {
    res.send('buddi pakaya ');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
