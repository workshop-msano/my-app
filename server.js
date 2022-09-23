/*
Herokuの代替デプロイ先候補

https://bel-itigo.com/migrate-from-heroku-to-flyio/
*/

const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
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
    getLatestMovies:Movie
  }
  `);

const root = {
  getPopularMovies: async () => {
    //Get a list of the current popular movies on TMDB. This list updates daily.
    const popularMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.APIKEY}`
    );
    return popularMovies.data.results;
  },
  getLatestMovies: async () => {
    const latestMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.APIKEY}&language=en-US`
    );
    console.log("latest: ", latestMovies.data);
    return latestMovies.data;
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(express.static(path.resolve(__dirname, "/build")));
//https://nodejs.dev/en/learn/the-nodejs-path-module/#pathresolve

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
