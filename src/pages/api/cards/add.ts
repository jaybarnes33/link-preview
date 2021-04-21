import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";
import Card from "@/models/Card";
import scrapeData from "@/utils/scrapeData";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      await dbConnect();
      //   let token = req.headers.authorization;
      //   if (token) {
      //     token = req.headers.authorization.split(" ")[1];
      //   } else {
      //     res.status(401).json("Invalid token");
      //   }

      //   const userID = getUserID(token);
      //   console.log(token);
      //   console.log(userID);
      //   if (!userID) return res.status(401).end("Unauthorized!");

      const { url } = req.body;

      const data: any = await scrapeData(url);

      console.log(data);

      const { title, description, author, image, favicon } = data;
      const card = new Card({
        link: url,
        title: title,
        description: description,
        author: author,
        image: image,
        favicon: favicon,
      });

      await card.save();

      res.status(201).json({ card });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
};
