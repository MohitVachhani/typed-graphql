import { Query, Resolver, Args,Arg, Root, FieldResolver, Mutation } from "type-graphql";
import { User } from "../entities/User";
import { Course } from "../entities/Course";
import {GetUserByIdArgs, CreateUserInput} from "../args/userArgs";
import PaginationArgs from '../args/paginationArgs';
import users from '../../data/user.json';
import courses from '../../data/course.json';

@Resolver(User)
class UserResolver{

  @Query(_returns => User)
    async getUserById(@Args() {id}: GetUserByIdArgs){
    console.log('User Id:', id);
    const userDoc = users.find(doc => doc.id.toString() === id.toString());
    return userDoc;
  }

  @Mutation(() => User)
    async createUser(@Arg("data") {emailId, name, surname}: CreateUserInput){
      console.log('Creating a new user!');
      const user ={
        id: '5',
        name,
        emailId,
        surname,
        courseIds: []
      };
      return user;
    }

  @FieldResolver(_returns => Course)
  async courses(@Args() {offset, limit}: PaginationArgs, @Root() user: User) {
    const{
      courseIds
    } = user;
    console.log('CourseIds:', courseIds);
    if(!courseIds){
      return [];
    }
    const requiredCourses = courses.filter(doc => {
      if (courseIds.indexOf(doc.id) !== -1) {
        return true;
      }
      return false;
    })
    return requiredCourses.splice(offset, offset+limit);
  }
}

export default UserResolver;