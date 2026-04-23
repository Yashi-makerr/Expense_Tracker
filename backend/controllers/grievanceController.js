import Grievance from "../models/Grievance.js";

// ✅ CREATE grievance
export const addGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // ✅ validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const grievance = new Grievance({
      userId: req.user.id,
      title,
      description,
      category,
      status: "Pending" // ✅ default
    });

    await grievance.save();
    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET all grievances
export const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ userId: req.user.id });
    res.json(grievances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET grievance by ID
export const getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      userId: req.user.id // ✅ security fix
    });

    if (!grievance) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(grievance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE grievance
export const updateGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      userId: req.user.id // ✅ only owner can update
    });

    if (!grievance) {
      return res.status(404).json({ message: "Not found" });
    }

    // ✅ update fields safely
    grievance.title = req.body.title || grievance.title;
    grievance.description = req.body.description || grievance.description;
    grievance.category = req.body.category || grievance.category;
    grievance.status = req.body.status || grievance.status;

    await grievance.save();

    res.json(grievance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE grievance
export const deleteGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id // ✅ security fix
    });

    if (!grievance) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ SEARCH grievance by title
export const searchGrievances = async (req, res) => {
  try {
    const title = req.query.title || "";

    const results = await Grievance.find({
      title: { $regex: title, $options: "i" },
      userId: req.user.id
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};