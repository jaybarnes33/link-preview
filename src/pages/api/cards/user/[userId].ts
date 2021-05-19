import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";
import Card from "@/models/Card";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { userId, category } = req.query;
    const token = req.headers.authorization.split(" ")[1];

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    try {
      dbConnect();

      const cards =
        category == "all" || !category
          ? await Card.find({ creator: userId.toString() }).sort({
              createdAt: -1,
            })
          : await Card.find({
              $and: [{ creator: userId }, { category: category }],
            });
      res.status(200).json({ cards });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
