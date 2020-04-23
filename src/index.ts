import "reflect-metadata";
import graphqlHTTP from 'express-graphql';
import express from 'express';
import { buildSchema} from "type-graphql";
import UserResolver from './resolvers/User';
import CourseResolver from "./resolvers/Course";

const main = async() => {
  const schema = await buildSchema({
    resolvers:  [UserResolver, CourseResolver]
  });
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  app.listen(4000,()=>{
    console.log('Server started at:', 4000);
  });
}

main();