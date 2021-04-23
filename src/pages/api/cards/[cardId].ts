import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import Card from "@/models/Card";
import getUserID from "@/utils/get-userID";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "DELETE") {
    try {
      await dbConnect();

      const { cardId } = req.query;
      const token = req.headers.authorization.split(" ")[1];

      const userID = getUserID(token);
      if (!userID) {
        return res.status(401).end("Unauthorized!");
      } else {
        const card = await Card.findById(cardId);

        if (card.creator.toString() == userID.toString()) {
          await card.delete();
          res.status(200).json("Card deleted");
        } else {
          res.status(403).json("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
};
