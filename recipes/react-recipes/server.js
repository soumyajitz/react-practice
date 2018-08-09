const express = require('express');

// Schemas
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const cors = require("cors");
const bodyParser = require('body-parser');
const {typeDefs} = require('./schema');
const jwt = require('jsonwebtoken');
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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true    
}

app.use(cors(corsOptions));

//Setup JWT Auth middleware(to be written between cors and schema graphQL)
app.use(async(req, res, next) => {
    const token = req.headers['authorization'];
    if(token !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        }catch(err) {
            console.error(err)
        }
    }
    
    next();
});


//Connect Schemas with GraphQL
app.use('/graphql',
    bodyParser.json(),
    graphqlExpress(({currentUser}) => ({
    schema,
    context: {
        Recipe, 
        User,
        currentUser
    }
}))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, function() {
    console.log(`Server Listening on ${PORT}`);
})