import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class PaginationArgs {
  @Field(() => Int)
  offset: number = 0;

  @Field(() => Int)
  limit: number = 0;
}

export default PaginationArgs;