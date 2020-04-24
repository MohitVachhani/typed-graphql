import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
// import { Course } from "./Course";
// import {Types} from 'mongoose';

@ObjectType({ description: "The User model" })
export class User{
  
  _id: string;

  @Field(() => String)
  @Property()
  id: string;

  @Field(() => String)
  @Property({required: true})
  name: String;

  @Field(() => String)
  @Property({required: true})
  emailId: String;

  @Field(() => String)
  @Property({required: false})
  surname: String;
  
  // @Field(() => [String],{nullable: true})
  // courseIds: String[];

  // @Field(() => [Course])
  // courses?: Course[];
}

export const UserModel = getModelForClass(User,
{
  options:{
    customName: 'user'
  },
   schemaOptions:{
     autoIndex: false,
     timestamps: true
   }
});