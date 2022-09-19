/*
Herokuの代替デプロイ先候補

https://bel-itigo.com/migrate-from-heroku-to-flyio/
*/

const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
require('dotenv').config();
const cors = require('cors')
const path = require("path");


const schema = buildSchema(`

type Movie{
    id: Int
    title: String
    overview:String
    poster_path:String
}

type Query {
    getPopularMovies:[Movie]
}
`);

const root = {
  getPopularMovies: async () => {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.APIKEY}`
    );
    return movies.data.results;
  },
};

const app = express();
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.use(express.static(path.resolve(__dirname, "/build")));
//https://nodejs.dev/en/learn/the-nodejs-path-module/#pathresolve

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
