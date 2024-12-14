const db = require("../database/models/index");

exports.getUserSubscriptions = async (req, res) => {
  const id = req.params.id;

  try {
    const authUser = await db.User.findOne({
      attributes: ["id"],
      where: { id: id },
    });
    const subscriptions = await authUser.getSubscriptions({
      attributes: ["id", "UserName"],
    });
    res.json(subscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserSubscribers = async (req, res) => {
  const id = req.params.id;
  try {
    const authUser = await db.User.findOne({
      where: { id: id },
    });

    const subscribers = await authUser.getSubscribers({
      attributes: ["id", "UserName"],
    });
    res.json(subscribers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
