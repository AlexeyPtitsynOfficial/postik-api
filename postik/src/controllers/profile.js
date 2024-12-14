const e = require("express");
const db = require("../database/models/index");

exports.getProfileById = async (req, res) => {
  const id = req.params.id;

  try {
    const profile = await db.User.findByPk(id, {
      attributes: [
        "User.id",
        "UserName",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("Postiks.id")),
          "PostiksNumber",
        ],
      ],
      include: [
        {
          required: false,
          model: db.UsersAvatars,
          as: "Avatars",
          attributes: ["URL"],
        },
        {
          required: false,
          model: db.Postik,
          attributes: [],
          where: {
            UserID: id,
          },
        },
      ],
      group: ["User.id", "UserName", "Avatars.id"],
    });

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostiks = async (req, res) => {
  const id = req.params.id;
  try {
    const postiks = await db.Postik.findAll({
      attributes: ["Postik.id"],
      include: [
        {
          attributes: ["URL"],
          model: db.PostikImagesUrls,
          as: "ImagesUrls",
          limit: 1,
        },
      ],
      order: ["createdAt"],
      where: { UserID: id },
    });
    if (postiks) {
      res.json(postiks);
    } else {
      res.status(404).json({ error: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const userID = req.body.id;
    let imagesUrls = [];
    for (let i = 0; i < req.files.length; i++) {
      let fileUrl =
        "http://localhost:5000" +
        req.files[i].path
          .replace(/\\/g, "/")
          .substring(
            req.files[i].path.indexOf("public") + 6,
            req.files[i].path.length
          );
      console.log("images url path = " + fileUrl);
      imagesUrls = db.UsersAvatars.create({
        UserID: userID,
        URL: fileUrl,
      });
    }
    console.log("images url created");
    res.status(201).json({ message: "data upload successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.checkSubscription = async (req, res) => {
  try {
    const userID = req.body.ID;
    const userIDSubscription = req.body.UserIDSubscription;

    /*const subscription = db.UsersSubscriptions.findOne({
      attributes: [
        db.sequelize.fn("COUNT", db.sequelize.col("UsersSubscriptions.id")),
      ],
      where: { UserID: userID, SubscriptionUserID: userIDSubscription },
    });*/

    let subscription = await db.UsersSubscriptions.count({
      where: { UserId: userID, subscriptionId: userIDSubscription },
    });

    if (subscription > 0) res.status(200).send(true);
    else res.status(200).send(false);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.subscribe = async (req, res) => {
  try {
    const { UserID, UserIDSubscription } = req.body;

    try {
      const newSubscription = await db.UsersSubscriptions.create({
        UserId: UserID,
        subscriptionId: UserIDSubscription,
      });

      res.status(201).send(newSubscription);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } catch (error) {}
};

exports.unsubscribe = async (req, res) => {
  const { UserID, UserIDSubscription } = req.body;
  try {
    const usersSubscriptions = await db.UsersSubscriptions.findOne({
      where: { UserId: UserID, subscriptionId: UserIDSubscription },
    });
    if (usersSubscriptions) {
      await usersSubscriptions.destroy();
      res.json(usersSubscriptions);
    } else {
      res.status(404).json({ error: "not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
