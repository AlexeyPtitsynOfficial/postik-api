
import { ApiError, handleMessageReceived } from "../utils";
import { Request, Response } from 'express';

import {Message, database } from "../database";
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

exports.send = async (req:Request, res: Response) => {
  try {
    const { senderId, name, email, receiveId, message } = req.body;

    validateReceiver(senderId, receiveId);

    const newMessage = await Message.create({
      senderId: senderId,
      receiveId: receiveId,
      message: message
    });

    await handleMessageReceived(name, email, receiveId, message);

    return res.json({
      status: 200,
      message: "Message sent successfully!",
      data: newMessage
    });
  } catch (error:any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

const validateReceiver = (senderId:any, receiverId:any) => {
  if (!receiverId) {
    throw new ApiError(404, "Receiver ID is required.");
  }

  if (senderId == receiverId) {
    throw new ApiError(400, "Sender and receiver cannot be the same.");
  }
};

export const getConversation = async (req:Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.params.id;

    const messages = await Message.findAll({ where: {
       senderId: receiverId, receiverId: senderId }
    });

    return res.status(200).send({
      message: "Messages retrieved successfully!",
      data: messages,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
