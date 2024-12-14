import { User, Role } from "../database";
import { Request, Response } from "express";

const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: any
) => {
  console.log("form data");
  console.log(req.body);
  User.findOne({
    where: {
      UserName: req.body.UserName,
    },
  }).then((user: any) => {
    if (user) {
      res.status(400).json({
        message: "Failed! Username is already in use!",
      });
    }

    User.findOne({
      where: {
        Email: req.body.Email,
      },
    }).then((user: any) => {
      if (user) {
        res.status(400).json({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = (req: Request, res: Response, next: any) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Role.ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
