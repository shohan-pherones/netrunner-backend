import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
