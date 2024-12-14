"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const config = require("../../config/database.js");

let sequelize;

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Postik = require("./postik.js")(sequelize, Sequelize);
db.PostikImagesUrls = require("./postiksimagesurl.js")(sequelize, Sequelize);

db.UsersSubscriptions = require("./userssubscriptions.js")(
  sequelize,
  Sequelize
);

db.UsersAvatars = require("./usersavatars.js")(sequelize, Sequelize);

//db.User.hasMany(db.Postik, { foreignKey: "UserID" });

//db.User.hasMany(db.UsersAvatars, { as: "Avatars", foreignKey: "UserID" });
//db.UsersAvatars.belongsTo(db.User, { foreignKey: "UserID" });

/*db.User.belongsToMany(db.User, {
  as: "subscriptions",
  through: "UsersSubscriptions",
});

db.User.belongsToMany(db.User, {
  foreignKey: "subscriptionId",
  as: "subscribers",
  through: "UsersSubscriptions",
});*/

//db.User.hasMany(db.User, { foreignKey: "SubscriptionUserID" });

//db.UsersSubscriptions.belongsTo(db.User, { foreignKey: "SubscriptionUserID" });

db.Postik.hasMany(db.PostikImagesUrls, {
  foreignKey: "PostikID",
  as: "ImagesUrls",
});
db.PostikImagesUrls.belongsTo(db.Postik, {
  foreignKey: "PostikID",
  as: "Postiks",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
