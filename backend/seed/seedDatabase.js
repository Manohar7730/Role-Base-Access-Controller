import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
export const seedDatabase = async () => {
  const { SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } =
    process.env;
  if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_NAME || !SUPER_ADMIN_PASSWORD) {
    throw new Error(
      "SUPER_ADMIN_EMAIL,SUPER_ADMIN_NAME,SUPER_ADMIN_PASSWORD are required",
    );
  }
  const permissions = [
    {
      key: "permission.read",
      description: "View permissions",
    },
    {
      key: "permission.create",
      description: "Create permissions",
    },
    {
      key: "role.read",
      description: "View roles",
    },
    {
      key: "role.create",
      description: "Create roles",
    },
    {
      key: "role.update",
      description: "Update roles",
    },
    {
      key: "user.read",
      description: "View users",
    },
    {
      key: "user.update",
      description: "Update users",
    },
  ];
  const permissionDocs = [];
  for (const permission of permissions) {
    let existing = await Permission.findOne({
      key: permission.key,
    });

    if (!existing) {
      existing = await Permission.create(permission);
    }

    permissionDocs.push(existing);
  }
  let superAdminRole = await Role.findOne({
    name: "SUPER_ADMIN",
  });

  if (!superAdminRole) {
    superAdminRole = await Role.create({
      name: "SUPER_ADMIN",
      permissions: permissionDocs.map((p) => p._id),
    });
    console.log("SUPER_ADMIN role created");
  } else {
    superAdminRole.permissions = permissionDocs.map((p) => p._id);
    await superAdminRole.save();

    console.log("SUPER_ADMIN role updated");
  }
  let superAdmin = await User.findOne({
    email: SUPER_ADMIN_EMAIL,
  });
  if (!superAdmin) {
    superAdmin = await User.create({
      name: SUPER_ADMIN_NAME,
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
      status: "ACTIVE",
      role: superAdminRole._id,
    });

    console.log("SUPER_ADMIN user created");
  } else {
    superAdmin.role = superAdminRole._id;
    superAdmin.status = "ACTIVE";

    await superAdmin.save();

    console.log("SUPER_ADMIN user already exists");
  }

  console.log("Initial database seed completed");
};
