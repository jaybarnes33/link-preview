import mongoose, { Document } from "mongoose";
import { Card } from "react-bootstrap";

export interface ICardSchema extends Document {
  link: string;
  description: string;
  author: string;
  image: string;
  title: string;
}

const CardSchema = new mongoose.Schema<ICardSchema>({
  link: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  author: {
    type: String,
  },
});

export default Card;
