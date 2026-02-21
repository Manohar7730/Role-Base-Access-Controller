import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    return res.status(200).json({ message: "Roles fetched", data: roles });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const checkExist = await Role.findOne({ name });
    if (checkExist) {
      return res.status(400).json({ message: "Role already exist" });
    }
    const role = await Role.create({
      name,
      permissions,
    });
    return res.status(201).json({ message: "role created", data: role });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { permissions } = req.body;
    const { id } = req.params;
    const updatedRole = await Role.findByIdAndUpdate(
      { _id: id },
      { permissions },
      { new: true },
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    return res.status(201).json({ message: "permissions updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
