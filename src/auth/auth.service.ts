import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { SendOtpInput } from './dto/send-otp.input';
import { SignInInput } from './dto/sign-in.input';
import { VerifyOtpAndSignUpInput } from './dto/verify-otp-and-sign-up.input';
import { Auth } from './entities/auth.entity';

const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async sendOtp(data: SendOtpInput): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore[data.email] = { otp, expiresAt };
    console.log(`OTP for ${data.email}: ${otp}`);

    await this.emailService.sendOtpEmail(data.email, otp);

    return 'OTP sent successfully.';
  }

  async verifyOtpAndSignUp(data: VerifyOtpAndSignUpInput): Promise<Auth> {
    const otpRecord = otpStore[data.email];

    if (
      !otpRecord ||
      otpRecord.otp !== data.otp ||
      Date.now() > otpRecord.expiresAt
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    delete otpStore[data.email];

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return { token };
  }

  async signIn(data: SignInInput): Promise<Auth> {
    const { identifier, password } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return { token };
  }
}
