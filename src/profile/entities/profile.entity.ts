import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Sex } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

registerEnumType(Sex, {
  name: 'Sex',
});

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field({ nullable: true })
  coverPhoto?: string;

  @Field({ nullable: true })
  profilePhoto?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Sex)
  sex: Sex;

  @Field()
  dateOfBirth: Date;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;
}
