import { Query, Resolver, Args, Arg, Root, FieldResolver, Mutation, Info } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { GetUserByKeyArgs, CreateUserInput } from "../args/userArgs";
import { Types } from 'mongoose';

@Resolver(User)
class UserResolver {

  @Query(_returns => User)
  async getUserById(@Args() { id }: GetUserByKeyArgs, @Info() infoObject: any): Promise<User | null> {
    const projectedFields = infoObject.fieldNodes[0].selectionSet.selections.map((doc: { name: { value: any; }; }) => doc.name.value);
    console.log('Projected fields: ', projectedFields);
    if (id) {
      const [userDoc] = await UserModel.find({ _id: Types.ObjectId(id.toString()) },{
        name: 1,
        surname: 1,
        emailId: 1
      });
      return userDoc.toJSON();
    }
    return null;
  }

  @Query(_returns => User)
  async getUserByEmailId(@Args() { email }: GetUserByKeyArgs): Promise<User | null> {
    if (email) {
      const [userDoc] = await UserModel.find({ emailId: email });
      return userDoc.toJSON();
    }
    return null;
  }

  @Query(_returns => [User])
  async getAllUsers() {
    console.log('Recived a query!');
    const userDocs = await UserModel.find({});
    const requiredUserDocs = userDocs.map(doc => doc.toJSON());
    return requiredUserDocs;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") { emailId, name, surname }: CreateUserInput): Promise<User> {
    console.log('Creating a new user!');
    const user = {
      name,
      emailId,
      surname
    };
    const result = await ((await (UserModel.create(user))).execPopulate());
    console.log(result);
    return result;
  }

  @FieldResolver(_returns => String)
  id(@Root() user: User): string {
    const id = user._id;
    return id;
  }
}

export default UserResolver;