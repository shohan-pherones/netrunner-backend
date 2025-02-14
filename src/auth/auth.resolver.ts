import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SendOtpInput } from './dto/send-otp.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { Auth } from './entities/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello from GraphQL!';
  }

  @Mutation(() => String)
  async sendOtp(@Args('data') data: SendOtpInput): Promise<string> {
    return this.authService.sendOtp(data);
  }

  @Mutation(() => Auth)
  verifyOtp(@Args('data') data: VerifyOtpInput): string {
    return this.authService.verifyOtp(data);
  }

  @Mutation(() => Auth)
  async signUp(@Args('data') data: SignUpInput): Promise<Auth> {
    return this.authService.signUp(data);
  }

  @Mutation(() => Auth)
  async signIn(@Args('data') data: SignInInput): Promise<Auth> {
    return this.authService.signIn(data);
  }

  @Mutation(() => String)
  async requestPasswordReset(@Args('email') email: string): Promise<string> {
    return this.authService.requestPasswordReset(email);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    return this.authService.resetPassword(token, newPassword);
  }
}
