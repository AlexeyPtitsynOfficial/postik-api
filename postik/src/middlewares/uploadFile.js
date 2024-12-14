const multer = require("multer");
var path = require("path");
let fs = require("fs-extra");

const storage = multer.diskStorage({
  //destination: "./resources/postiksimages/postik",
  destination: function (req, file, cb) {
    let path = "";
    switch (req.body.type) {
      case "postik":
        path =
          __dirname +
          `../../../public/uploads/postiks/postik-${req.body.id}/postiksimages`;
      case "avatar":
        path =
          __dirname +
          `../../../public/uploads/users/user-${req.body.id}/avatars`;
    }

    fs.mkdirsSync(path);
    cb(null, path);

    //cb(null, path.join(__dirname, "/resources/postiksimages/postik"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = async (req, file, cb) => {
  const allowedFormats = ["image/jpeg", "image/png"];

  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const res = {
      status: 400,
      description: "Bad Request",
      result: "Only JPEG and PNG are allowed.",
    };

    cb(JSON.stringify(res, null, 2), false);
  }
};

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
});

const uploadMiddleware = (req, res, next) => {
  const upload = uploadFile.array("Files", 10);
  console.log("start uploading");
  // Here call the upload middleware of multer
  upload(req, res, function (err) {
    for (let file of req.files) {
      console.log("files uploaded = " + file.path);
    }

    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
      next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      //const err = new Error("Server Error");
      console.log(err.message);
      console.log("UnhandledError", err);
      next(err);
    }
    console.log("uploading complete");
    // Everything went fine.
    next();
  });
};

module.exports = uploadMiddleware;
