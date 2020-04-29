import { ArgsType, Field, ID, InputType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ArgsType()
export class GetUserByKeyArgs {
  @Field(() => ID, {nullable: true})
  id?: String;

  @Field(() => String, {nullable: true})
  email?: String;
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

