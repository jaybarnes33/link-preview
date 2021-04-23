import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";
import Card from "@/models/Card";
import scrapeData from "@/utils/scrapeData";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      await dbConnect();

      const cards = await Card.find({}).populate("creator", "fname username");

      res.status(200).json({ cards });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method == "POST") {
    try {
      await dbConnect();
      let token = req.headers.authorization;
      if (token) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        res.status(401).json("Invalid token");
      }

      const userID = getUserID(token);
      console.log(userID);

      if (!userID) return res.status(401).end("Unauthorized!");

      const { url } = req.body;

      const data = await scrapeData(url);

      const { title, description, author, image, favicon } = data[0];
      const card = new Card({
        link: url,
        title: title,
        creator: userID.toString(),
        description: description,
        author: author,
        image: image.startsWith("/") ? url + image : image,
        favicon: favicon.startsWith("/") ? url + favicon : favicon,
      });

      await card.save();

      res.status(201).json(card);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
};
