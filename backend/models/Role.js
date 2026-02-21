import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
