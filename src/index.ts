import dotenv from 'dotenv';
import "reflect-metadata";
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import { buildSchema} from "type-graphql";
import UserResolver from './resolvers/User';

// import express from 'express';
// const app = express();
const app = require("fastify")({
  logger: false
});
import {compileQuery} from 'graphql-jit';
import {parse} from 'graphql';


dotenv.config();

const uri = (process.env.MONGODB_URI)?.toString() || '';

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});


async function connectMongo(){
  await mongoose.connect(uri, { useFindAndModify: false , useNewUrlParser: true, useUnifiedTopology: true});
  console.log('mongoose connected');
}

// async function typedGraphqlExpress(schema: any, app: any){
//   app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
//     pretty: true,
//   }));
// }

function usingGraphqlJit(schema: any, app: any) {
  const cache: any = {};
  app.use(
    "/graphql",
    graphqlHTTP((_, __, {query}:any) => {
      if(!query){
        query = `{
          getAllUsers{
            name
          }
        }`;
      }
      if (!(query in cache)) {
        const document = parse(query);
        cache[query] = compileQuery(schema, document);
      }
      return {
        schema,
        graphiql: true,

        customExecuteFn: ({ rootValue, variableValues, contextValue }) =>
          cache[query].query(rootValue, contextValue, variableValues)
      };
    })
  );
}

const main = async() => {
  const schema = await buildSchema({
    resolvers:  [UserResolver]
    // emitSchemaFile: {
    //   path: __dirname + 'schema.graphql',
    //   commentDescriptions: true
    // }
  });
  // typedGraphqlExpress(schema, app);
  usingGraphqlJit(schema, app);


  app.listen(4000,()=>{
    console.log('Server started at:', 4000);
  });
  await connectMongo();
}

main();


//http://localhost:4000/graphql?query=%7B%0A%20%20getAllUsers%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A