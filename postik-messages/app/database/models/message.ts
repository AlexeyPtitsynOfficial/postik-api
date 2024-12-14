
"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";
import sequelize from '../database';

  enum Status {
    NotDelivered = "NotDelivered",
    Delivered = "Delivered",
    Seen = "Seen",
  };

  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Model) {
      // define association here
    }
  }
  Message.init(
    {
      senderId: DataTypes.STRING,
      receiveId: DataTypes.STRING,
      status: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  export default Message;