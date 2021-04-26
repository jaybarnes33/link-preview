import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import multer from "multer";
import nextConnect from "next-connect";

type NextApiRequestWithFormData = NextApiRequest & {
  file: File & { path: string };
};

const router = nextConnect();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
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
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
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

router.use(upload.single("image"));
router.post(async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  try {
    res.send(`/${req.file.path}`);
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
