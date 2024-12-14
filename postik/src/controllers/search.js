const db = require("../database/models/index");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const searchPeople = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { UserName: { [Op.iLike]: `%${req.params.SearchText}%` } },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPostiks = async (req, res) => {
  try {
    const postiks = await db.Postik.findAll({
      include: ["ImagesUrls"],
      order: ["createdAt"],
      where: { Title: { [Op.iLike]: `%${req.params.SearchText}%` } },
    });
    res.status(200).json(postiks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  const tabIndex = req.params.TabIndex;

  if (tabIndex == 0) searchPostiks(req, res);
  if (tabIndex == 1) searchPeople(req, res);
};
