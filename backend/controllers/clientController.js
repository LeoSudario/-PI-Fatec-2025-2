const Client = require("../models/client");
const Gym = require("../models/gym");

addClient = async (req, res) => {
    const client = new Client(req.body);
    await client.save();

    const gym = await Gym.findOne({ name: client.gymName });
    if (gym) {
        gym.occupancy += 1;
        await gym.save();
    }
    res.status(201).json(client);
};

checkoutClient = async (req, res) => {
    const { name, gymName } = req.body;
    const client = await Client.findOneAndDelete({ name, gymName });
    if (!client) return res.status(404).json({ message: "Client not found" });
    const gym = await Gym.findOne({ name: gymName });

    if (gym) {
        gym.occupancy = Math.max(0, gym.occupancy - 1);
        await gym.save();
    }

    res.status(200).json({ message: "Checked out" });
};

getClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
};

module.exports = { addClient, checkoutClient, getClients };