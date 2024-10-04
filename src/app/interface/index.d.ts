import { TUser } from "../modules/User/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
