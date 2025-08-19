const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

signup = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
};

login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("📥 Body recebido:", req.body);

        const user = await User.findOne({ username });
        console.log("🔍 Usuário encontrado no banco:", user);

        if (!user) {
            console.log("Nenhum usuário encontrado com esse username");
            return res.status(401).json({ message: "Invalid credentials - usuário não encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`🔑 Comparando senha... resultado: ${isMatch}`);

        if (!isMatch) {
            console.log("Senha incorreta");
            return res.status(401).json({ message: "Invalid credentials - senha incorreta" });
        }
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });

    } catch (error) {
        console.error("💥 Erro no login:", error);
        return res.status(500).json({ message: "Erro no login", error: error.message });
    }
};

module.exports = { signup, login };