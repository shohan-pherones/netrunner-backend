import { Field, InputType } from '@nestjs/graphql';
import { Sex } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Nickname must be a string' })
  nickName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Cover photo must be a valid URL' })
  coverPhoto?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Profile photo must be a valid URL' })
  profilePhoto?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio?: string;

  @Field(() => Sex)
  @IsEnum(Sex, { message: 'Sex must be MALE, FEMALE, or OTHER' })
  sex: Sex;

  @Field()
  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  dateOfBirth: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Website must be a valid URL' })
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
}
