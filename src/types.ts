import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";

export interface EventStructure {
  id: string;
  name: string;
  location: string;
  image: string;
  date: string;
  time: string;
  organizer: string;
  category: string[];
}

export type Events = [EventStructure];

export interface CustomRequest extends Request {
  userId: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
