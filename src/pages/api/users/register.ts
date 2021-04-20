import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { fName, lName, password, email, username, country } = req.body;
      await dbConnect();

      const userExists = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });

      if (!userExists) {
        let user = new User({
          fName,
          lName,
          password,
          email,
          username,
          country,
        });

        await user.save();
        res.status(201).json(user);
      } else {
        res.status(403).json("User already exists");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).end("Something went wrong");
    }
  }
};
