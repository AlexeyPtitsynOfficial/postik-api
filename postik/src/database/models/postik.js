'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Postik.init({
    CategoryID: DataTypes.UUID,
    UserID: DataTypes.UUID,
    AuthorName: DataTypes.STRING,
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    LikesCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Postik',
  });
  return Postik;
};