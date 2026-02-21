import Permission from "../models/Permission.js";

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    return res.status(200).json({
      message: "Permissions fetched",
      data: permissions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { key, description } = req.body;
    const checkExist = await Permission.findOne({ key });
    if (checkExist) {
      return res.status(400).json({ message: "Permission Key Exists" });
    }
    const permission = await Permission.create({
      key,
      description,
    });
    return res
      .status(201)
      .json({ message: "Permission key created", data: permission });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
