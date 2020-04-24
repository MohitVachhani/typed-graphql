import { Query, Resolver, Args,Arg, Root, FieldResolver, Mutation } from "type-graphql";
import { User, UserModel } from "../entities/User";
// import { Course } from "../entities/Course";
import {GetUserByIdArgs, CreateUserInput} from "../args/userArgs";
import { Types } from 'mongoose';
// import {Types} from 'mongoose';
// import PaginationArgs from '../args/paginationArgs';
// import users from '../../data/user.json';
// import courses from '../../data/course.json';

@Resolver(User)
class UserResolver{

  @Query(_returns => User)
    async getUserById(@Args() {id}: GetUserByIdArgs){
    console.log('User Id:', id);
    const [userDoc] = await UserModel.find({_id: Types.ObjectId(id.toString())});
    console.log('UserDoc:', userDoc);
    // const userDoc = users.find(doc => doc.id.toString() === id.toString());
    // return userDoc;
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

  // @FieldResolver(_returns => Course)
  // async courses(@Args() {offset, limit}: PaginationArgs, @Root() user: User) {
  //   const{
  //     courseIds 
  //   } = user;
  //   console.log('CourseIds:', courseIds);
  //   if(!courseIds){
  //     return [];
  //   }
  //   const requiredCourses = courses.filter(doc => {
  //     if (courseIds.indexOf(doc.id) !== -1) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   return requiredCourses.splice(offset, offset+limit);
  // }

  @FieldResolver(_returns => String)
  id(@Root()user: User): string{
    console.log(user);
    const id = user._id;
    return id;
  }
}

export default UserResolver;