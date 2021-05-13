import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import multer from "multer";
import nextConnect from "next-connect";

type NextApiRequestWithFormData = NextApiRequest & {
  file: File & { filename: string };
};

const router = nextConnect();

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.use(upload.single("image"));
router.post(async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];

    // const userID = getUserID(token);
    // if (!userID) return res.status(401).end("Unauthorized!");

    // const user = await User.findById(userID);

    // if (!user) return res.status(400).end("User not found");

    res.send(`${req.file.filename}`);
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

export default router;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
