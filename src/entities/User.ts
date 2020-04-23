import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Course } from "./Course";

@ObjectType({ description: "The User model" })
export class User{
  
  @Field(() => ID)
  @Property()
  id: String;
  
  @Field(() => String)
  @Property({required: true})
  name: String;

  @Field(() => String)
  @Property({required: true})
  emailId: String;

  @Field(() => String)
  @Property({required: false})
  surname: String;
  
  @Field(() => [String],{nullable: true})
  courseIds: String[];

  @Field(() => [Course])
  courses?: Course[];
}

export const UserModel = getModelForClass(User);