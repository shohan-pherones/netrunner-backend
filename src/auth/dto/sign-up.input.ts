import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { Role } from '../enums/role.enum';

@InputType()
export class SignUpInput {
  @Field()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @Field(() => Role, { defaultValue: Role.USER })
  @IsEnum(Role, { message: 'Role must be either USER or ADMIN' })
  role: Role;
}
