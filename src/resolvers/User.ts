import { Query, Resolver, Args,Arg, Root, FieldResolver, Mutation } from "type-graphql";
import { User, UserModel } from "../entities/User";
import {GetUserByIdArgs, CreateUserInput} from "../args/userArgs";
import { Types } from 'mongoose';

@Resolver(User)
class UserResolver{

  @Query(_returns => User)
    async getUserById(@Args() {id}: GetUserByIdArgs){
    console.log('User Id:', id);
    const [userDoc] = await UserModel.find({_id: Types.ObjectId(id.toString())});
    console.log('UserDoc:', userDoc);
    return userDoc;
  }

  @Mutation(() => User)
    async createUser(@Arg("data") {emailId, name, surname}: CreateUserInput){
      console.log('Creating a new user!');
      const user ={
        name,
        emailId,
        surname,
        courseIds: []
      };
      const result = await (await (await UserModel.create(user)).save()).toJSON();
      return result;
    }

  @FieldResolver(_returns => String)
  id(@Root()user: User): string{
    console.log(user);
    const id = user._id;
    return id;
  }
}

export default UserResolver;