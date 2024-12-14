"use strict";
const { Model, DataTypes } = require("sequelize");
import connection from "../connection";
import Role from "./role";

interface UserAttributes {
  UserName: string;
  FirstName: string;
  LastName: string;
  Patronymic: string;
  Email: string;
  Password: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public UserName!: string;
  public FirstName!: string;
  public LastName!: string;
  public Patronymic!: string;
  public Email!: string;
  public Password!: string;

  public readonly updatedAt?: Date;
  public readonly createdAt?: Date;
}
User.init(
  {
    UserName: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Patronymic: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
  },
  {
    modelName: "User",
    sequelize: connection,
  }
);

Role.belongsToMany(User, {
  through: "UsersRoles",
});

User.belongsToMany(Role, {
  through: "UsersRoles",
});

export default User;
