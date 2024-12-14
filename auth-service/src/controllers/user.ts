const User = require("../database/models/user");
import { Request, Response } from "express";

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createUser = async (req: Request, res: Response) => {
  const { task, createdDate, percentCompleted, isCompleted } = req.body;
  try {
    const newUser = await User.create({
      task,
      createdDate,
      percentCompleted,
      isCompleted,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller method to get a todo by ID
exports.getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller method to update a todo by ID
exports.updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { task, createdDate, percentCompleted, isCompleted } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.task = task;
      user.createdDate = createdDate;
      user.percentCompleted = percentCompleted;
      user.isCompleted = isCompleted;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller method to delete a todo by ID
exports.deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json(user);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
