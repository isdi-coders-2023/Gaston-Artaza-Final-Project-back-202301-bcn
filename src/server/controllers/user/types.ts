import { type JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface CustomTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
