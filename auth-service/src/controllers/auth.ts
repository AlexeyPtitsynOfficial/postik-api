const Sequelize = require("sequelize");
import { Request, Response } from "express";
import { User, Role } from "../database";

const Op = Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        Email: req.body.Email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].Name.toUpperCase());
      }
      return res.status(200).send({
        user: {
          id: user.id,
          UserName: user.UserName,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Role: authorities,
        },
        token: token,
      });
    });
    return res.status(200).send({
      user: {
        id: user.id,
        UserName: user.UserName,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
      },
      token: token,
    });
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

const signUp = async (req: Request, res: Response) => {
  console.log("asd - ");
  console.log(req.body);
  const { UserName, Email, Password } = req.body;
  // Check if the email exists
  const userExists = await User.findOne({
    where: { Email },
  });
  if (userExists) {
    return res.status(400).send("Email is already associated with an account");
  }
  try {
    const user = await User.create({
      UserName: UserName,
      Email: Email,
      Password: bcrypt.hashSync(Password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
      return res.send({ message: "User was registered successfully!" });
    } else {
      // user role = 1
      await user.setRoles([1]);
      return res.send({ message: "User was registered successfully!" });
    }
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

export { login, signUp };
