import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import Card from "@/models/Card";
import getUserID from "@/utils/get-userID";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      await dbConnect();

      const { cardId } = req.query;
      const token = req.headers.authorization.split(" ")[1];

      const userID = getUserID(token);
      if (!userID) {
        return res.status(401).end("Unauthorized!");
      } else {
        const categories = await Card.find({ creator: userID }).distinct(
          "category"
        );

        res.json(categories);
      }
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
};
