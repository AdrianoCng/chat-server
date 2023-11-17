import { UserSchema } from '@models/User';
import { ObjectId } from 'mongoose';

declare global {
  namespace Express {
    interface User
      extends Pick<
        UserSchema,
        '_id' | 'username' | 'password' | '__v' | 'id'
      > {}
  }
}

declare module 'node:http' {
  interface IncomingMessage {
    user: Express.User;
    session: any;
  }
}
