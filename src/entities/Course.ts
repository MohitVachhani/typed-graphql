import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";


@ObjectType({ description: "The Course model" })
export class Course{
  @Field(() => ID)
  @Property()
  id: String;
  
  @Field(() => String)
  @Property({required: true})
  name: String;
}


export const CourseModel = getModelForClass(Course);