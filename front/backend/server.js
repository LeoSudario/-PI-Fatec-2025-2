const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const JWT_SECRET = "your_super_secret_key";

mongoose.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true });

const gymScheme = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    capacity: { type: Number, default: 0 },
    occupancy: { type: Number, default: 0 }
});
const Gym = mongoose.model("Gym", gymScheme);

const clientScheme = new mongoose.Schema({
    phone: String,
    email: String,
    name: String,
    gymName: String
});
const Client = mongoose.model("Client", clientScheme);

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/clients', authenticateToken, async (req, res) => {
    const client = new Client(req.body);
    await client.save();

    const gym = await Gym.findOne({ name: client.gymName });
    if (gym) {
        gym.occupancy += 1;
        await gym.save();
    }
    res.status(201).json(client);
});

app.post('/clients/checkout', authenticateToken, async (req, res) => {
    const { name, gymName } = req.body;
    const client = await Client.findOneAndDelete({ name, gymName });
    if (!client) return res.status(404).json({ message: "Client not found" });
    const gym = await Gym.findOne({ name: gymName });

    if (gym) {
        gym.occupancy = Math.max(0, gym.occupancy - 1);
        await gym.save();
    }

    res.status(200).json({ message: "Checked out" });
});

app.post('/gyms', authenticateToken, async (req, res) => {
    const gym = new Gym(req.body);
    await gym.save();
    res.status(201).json(gym);
});

app.get('/clients', authenticateToken, async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

app.get('/gyms', authenticateToken, async (req, res) => {
    const gyms = await Gym.find();
    res.json(gyms);
});

app.delete('/gyms/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findByIdAndDelete(id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});