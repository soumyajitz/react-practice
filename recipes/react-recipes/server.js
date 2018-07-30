const express = require('express');

// Schemas
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const bodyParser = require('body-parser');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

// Bring in graphQL express middleware
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Connects to MondoDB
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => console.error(err));


//Starts Express server
const app = express();

//Create GraphQL application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))


//Connect Schemas with GraphQL
app.use('/graphql',
    bodyParser.json(),
    graphqlExpress({
    schema,
    context: {
        Recipe, 
        User
    }
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, function() {
    console.log(`Server Listening on ${PORT}`);
})