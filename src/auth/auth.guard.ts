import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable as InjectableGuard,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@InjectableGuard()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1] as string;
    try {
      const user = this.jwtService.verify(token);
      req.user = user;

      const requiredRoles =
        this.reflector.get<string[]>('roles', context.getHandler()) || [];

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ForbiddenException(
          'You do not have permission to perform this action',
        );
      }

      return true;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
