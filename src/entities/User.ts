import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

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
  @Property({required: true, unique: true})
  emailId: String;

  @Field(() => String)
  @Property({required: false})
  surname: String;
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