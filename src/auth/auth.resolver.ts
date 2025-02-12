import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SendOtpInput } from './dto/send-otp.input';
import { SignInInput } from './dto/sign-in.input';
import { VerifyOtpAndSignUpInput } from './dto/verify-otp-and-sign-up.input';
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
  async verifyOtpAndSignUp(
    @Args('data') data: VerifyOtpAndSignUpInput,
  ): Promise<Auth> {
    return this.authService.verifyOtpAndSignUp(data);
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
