import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, ReqUser } from '../types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const reqUser: ReqUser = {
      userId: new Types.ObjectId(payload.data.ref),
      userName: payload.data.userName,
      email: payload.data.email,
    };

    //console.log(`Nome do usuário da requisição: ${reqUser.userName}, id ${reqUser.userId}`);
    return reqUser;
  }

  public async getUserFromReq(req: Request): Promise<ReqUser | null> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return null
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const response: ReqUser = {
        userId: new Types.ObjectId(payload.data.ref),
        userName: payload.data.userName,
        email: payload.data.email,
      };

      return response;
    } catch (error) {
      return null;
    }
  }
}
