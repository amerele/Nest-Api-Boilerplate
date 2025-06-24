import { Types } from 'mongoose';

export type JwtPayload = {
  data: {
    ref: string;
    userName: string;
    email: string;
  };
};

export type ReqUser = {
  userId: Types.ObjectId;
  userName: string;
  email: string
};
