import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import multer from "multer";
import nextConnect from "next-connect";
import aws from "aws-sdk";
import multerS3 from "multer-s3";


aws.config.update({
  secretAccessKey: process.env.AWS_KEY,
  accessKeyId: process.env.AWS_KEY_ID,
  region: process.env.AWS_REGION_,
});

type NextApiRequestWithFormData = NextApiRequest & {
  file: File & { location: string };
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

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    key: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
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
    res.send(`${req.file.location}`);
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
