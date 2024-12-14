'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostiksImagesURL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostiksImagesURL.init({
    PostikID: DataTypes.UUID,
    URL: DataTypes.STRING,
    Order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostiksImagesURL',
  });
  return PostiksImagesURL;
};