const db = require("../database/models/index");
const Postik = db.Postik;

const upload = require("../middlewares/uploadFile");

exports.getAllPostiks = async (req, res) => {
  try {
    /*const postiks = await Postik.findAll({
      attributes: [
        [db.sequelize.col("Postik.id"), "id"],
        "CategoryID",
        "UserID",
        "AuthorName",
        "Title",
        "Description",
        [db.sequelize.col("PostiksImagesURLs.URL"), "ImagesUrls"],
      ],
      include: [
        {
          required: false,
          model: db.PostikImagesUrls,
          where: {
            PostikID: { [op.col]: "Postik.id" },
          },
        },
      ],
    })*/
    const postiks = await Postik.findAll({
      include: ["ImagesUrls"],
      order: ["createdAt"],
    });
    res.json(postiks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createPostik = async (req, res, next) => {
  const { CategoryID, UserID, AuthorName, Title, Description } = req.body;

  try {
    const newPostik = await Postik.create({
      CategoryID,
      UserID,
      AuthorName,
      Title,
      Description,
    });

    res.status(201).send(newPostik);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.uploadPostikImages = async (req, res) => {
  console.log("images url creating");

  const postikID = req.body.id;
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
    imagesUrls = db.PostikImagesUrls.create({
      PostikID: postikID,
      URL: fileUrl,
      Order: i,
    });
  }
  console.log("images url created");
  res.status(201).send({ message: "image created" });
};
// Controller method to get a todo by ID
exports.getPostikById = async (req, res) => {
  const id = req.params.id;
  try {
    const postik = await Postik.findByPk(id);
    if (postik) {
      res.json(postik);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Controller method to update a todo by ID
exports.updatePostik = async (req, res) => {
  const id = req.params.id;
  const { Title, Description } = req.body;
  try {
    const postik = await Postik.findByPk(id);
    if (postik) {
      postik.Title = Title;
      postik.Description = Description;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Controller method to delete a todo by ID
exports.deletePostik = async (req, res) => {
  const id = req.params.id;
  try {
    const postik = await Postik.findByPk(id);
    if (postik) {
      await postik.destroy();
      res.json(postik);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
