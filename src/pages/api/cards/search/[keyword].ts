import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import Card from "@/models/Card";
import getUserID from "@/utils/get-userID";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      await dbConnect();

      const { keyword } = req.query;
      const token = req.headers.authorization.split(" ")[1];

      const userID = getUserID(token);
      if (!userID) {
        return res.status(401).end("Unauthorized!");
      } else {
        const cards = await Card.find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } },
            { brand: { $regex: keyword, $options: "i" } },
          ],
        });
        if (!cards) {
          res.json("No cards found");
        }
        res.json(cards);
      }
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
};
