/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor ( @Inject() private jwtService : JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extraerTokenDeLaCabecera(request);
        if (!token) throw new UnauthorizedException();
  
        try {
          const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
          request["user"] = payload;
          return payload;
        } catch {
          throw new UnauthorizedException();
        }
  
        return true;
      }
      private extraerTokenDeLaCabecera(req: Request): string | undefined {
        const [tipo, token] = req.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
      }
    }