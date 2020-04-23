import { ArgsType, Field, ID, InputType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ArgsType()
export class GetUserByIdArgs {
  @Field(() => ID)
  @Property()
  id: String;
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @Property({required: true})
  name: String;

  @Field(() => String)
  @Property({required: true})
  emailId: String;

  @Field(() => String)
  @Property({required: true})
  surname: String;
}

