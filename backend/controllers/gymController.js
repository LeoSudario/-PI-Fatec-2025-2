const Gym = require("../models/gym");

createGym = async (req, res) => {
    const gym = new Gym(req.body);
    await gym.save();
    res.status(201).json(gym);
};

getGyms = async (req, res) => {
    const gyms = await Gym.find();
    res.json(gyms);
};

deleteGym = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findByIdAndDelete(id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    res.status(204).send();
};

module.exports = { createGym, getGyms, deleteGym };