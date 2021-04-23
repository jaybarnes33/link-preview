import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";
import multer from "multer";
export default async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<IUserSchema, "password">>
) => {
  try {
    await dbConnect();

    const token = req.headers.authorization.split(" ")[1];

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    const user = await User.findById(userID);
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, "./public/uploads/");
      },
      filename(req, file, cb) {
        cb(
          null,
          `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
      },
    });

    const checkFileType = (file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = fileTypes.test(file.mimetype);

      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb("Images Only!");
      }
    };
    const upload = multer({
      storage,
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
};
