import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ROLES } from 'src/common/constants/roles.constant';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  @UseGuards(AuthGuard)
  @Roles(ROLES.ADMIN, ROLES.USER)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @Context('req') req: any,
  ) {
    return this.profileService.createProfile(
      createProfileInput,
      req.user.userId as string,
    );
  }

  @Query(() => Profile)
  @UseGuards(AuthGuard)
  @Roles(ROLES.ADMIN, ROLES.USER)
  getMyProfile(@Context('req') req: any) {
    return this.profileService.getMyProfile(req.user.userId as string);
  }
}
