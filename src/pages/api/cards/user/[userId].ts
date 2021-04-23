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
    const { userId } = req.query;
    const token = req.headers.authorization.split(" ")[1];

    const { limit = 10, page = 1 } = req.query as Record<string, string>;
    const [parsedLimit, parsedPage] = [Number(limit), Number(page)];

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    try {
      dbConnect();

      const cards = await Card.find({ creator: userId.toString() })
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit);

      const allCards = await Card.find({ creator: userId.toString() }).select(
        "_id"
      );

      const lastCard = cards[cards.length - 1];

      const indexOfCursor = allCards.findIndex(
        (value) => value._id.toString() === lastCard._id.toString()
      );

      const hasMore = indexOfCursor + 1 < allCards.length;

      res.status(200).json({ cards, hasMore });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
