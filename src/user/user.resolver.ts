import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => [User])
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreateUserInput,
  ) {
    return this.userService.update(id, data);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
