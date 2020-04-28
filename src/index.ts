import dotenv from 'dotenv';
import "reflect-metadata";
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import { buildSchema} from "type-graphql";
import UserResolver from './resolvers/User';

dotenv.config();

const uri = (process.env.MONGODB_URI)?.toString() || '';

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});


async function connectMongo(){
  await mongoose.connect(uri, { useFindAndModify: false , useNewUrlParser: true, useUnifiedTopology: true});
  console.log('mongoose connected');
}

const main = async() => {
  const schema = await buildSchema({
    resolvers:  [UserResolver]
  });
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  app.listen(4000,()=>{
    console.log('Server started at:', 4000);
  });
  await connectMongo();
}

main();