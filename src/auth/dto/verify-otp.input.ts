import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class VerifyOtpInput {
  @Field()
  @IsNotEmpty({ message: 'OTP is required' })
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
