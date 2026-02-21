import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
