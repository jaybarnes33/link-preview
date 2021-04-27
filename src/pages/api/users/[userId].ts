import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<IUserSchema, "password">>
) => {
  if (req.method == "PUT") {
    try {
      await dbConnect();

      const token = req.headers.authorization.split(" ")[1];

      const userID = getUserID(token);

      const user = await User.findById(userID);

      const {
        username,
        fName,
        lName,
        password,
        email,
        image,
        country,
      } = req.body;

      user.username = username || user.username;
      user.fName = fName || user.fName;
      user.lName = lName || user.lName;
      user.password = password || user.password;
      user.email = email || user.email;
      user.image =
        "https://cardsforchange.s3.eu-west-3.amazonaws.com/" + image ||
        user.image;
      user.country = country || user.country;

      const updatedUser = await user.save();
      res.status(201).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
};
