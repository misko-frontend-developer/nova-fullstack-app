import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "./db/dbConnect";
import User from "./db/userModel";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

dbConnect();

app.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    const result = await user.save();
    const userId = result._id.toString();
    const token = jwt.sign(
      {
        userId,
        userEmail: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      "jwt-token",
      { expiresIn: "24h" }
    );
    res.status(201).send({
      message: "User Created Successfully",
      result,
      token,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: "Something went wrong",
    error: error.message,
  });
});

export default app;
