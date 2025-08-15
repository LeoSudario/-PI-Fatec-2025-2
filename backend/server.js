const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const gymRoutes = require("./routes/gymRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
app.use(cors());
app.use(express.json());

dbConnect();

app.use("/auth", authRoutes);
app.use("/gyms", gymRoutes);
app.use("/clients", clientRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});