import { InputType, Field } from '@nestjs/graphql';
import { SignUpInput } from './sign-up.input';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class VerifyOtpAndSignUpInput extends SignUpInput {
  @Field()
  @IsNotEmpty({ message: 'OTP is required' })
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}
