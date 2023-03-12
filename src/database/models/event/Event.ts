import { model, Schema } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  image: {
    type: String,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: [String],
  },
});

const Event = model("Event", eventSchema, "events");

export default Event;
