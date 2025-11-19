import { Request } from 'express';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as encryption from 'src/utils/encryption.utlis';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AdminAuthGuard extends AuthGuard('Authorization') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const tokenFromHeader = request.headers?.authorization;
    const tokenFromCookie = request.cookies?.Authorization;

    // Remove "Bearer " prefix if present
    const cleanTokenFromHeader = tokenFromHeader?.startsWith('Bearer ')
      ? tokenFromHeader.substring(7)
      : tokenFromHeader;
    const cleanTokenFromCookie = tokenFromCookie?.startsWith('Bearer ')
      ? tokenFromCookie.substring(7)
      : tokenFromCookie;

    const token = cleanTokenFromCookie || cleanTokenFromHeader;

    if (!token) return false;

    try {
      // 1️⃣ Decode token
      const decoded: any = encryption.findByToken(token);

      // 2️⃣ Check if token contains a user id
      if (!decoded?.id) return false;

      // 3️⃣ Validate user exists in database
      const user = await this.prisma.adminUser.findUnique({
        where: { user_id: decoded.id },
      });

      if (!user) return false;

      // 4️⃣ Attach user to request (optional but recommended)
      // ** Things that need to be discussed: ** // Should we attach the user object to the request or just the userId?
      request.headers['userId'] = user.user_id;

      return true;
    } catch (error) {
      return false;
    }
  }
}
