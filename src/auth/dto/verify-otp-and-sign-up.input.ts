import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { SignUpInput } from './sign-up.input';

@InputType()
export class VerifyOtpAndSignUpInput extends SignUpInput {
  @Field()
  @IsNotEmpty({ message: 'OTP is required' })
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}
