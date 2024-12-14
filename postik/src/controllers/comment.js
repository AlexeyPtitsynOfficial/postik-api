const Comment = require("../database/models/comment");

exports.getComments = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Comment.findAll({ where: { PostikID: id } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createComment = async (req, res) => {
  const { PostikID, UserID, ParentID, Text } = req.body;
  try {
    const newComment = await Comment.create({
      PostikID,
      UserID,
      ParentID,
      Text,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
