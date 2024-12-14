"use strict";
const { Model, DataTypes } = require("sequelize");
import connection from "../connection";

interface RoleAttributes {
  Name: string;
}

export const ROLES = ["user", "admin", "moderator"];

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public Name!: string;
}

Role.init(
  {
    Name: DataTypes.STRING,
  },
  {
    modelName: "Role",
    sequelize: connection,
  }
);

export default Role;
