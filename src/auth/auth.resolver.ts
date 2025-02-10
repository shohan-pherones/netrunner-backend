import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SendOtpInput } from './dto/send-otp.input';
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
}
