"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // define association here
    }
  }

  Profile.init(
    {
      UserName: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Patronymic: DataTypes.STRING,
      AvatarUrl: DataTypes.STRING,
      PostiksCount: DataTypes.INTEGER,
      SubscribersCount: DataTypes.INTEGER,
      SubscriptionsCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  return Profile;
};
