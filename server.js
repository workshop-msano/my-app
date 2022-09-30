/*
Herokuの代替デプロイ先候補

https://bel-itigo.com/migrate-from-heroku-to-flyio/

https://qiita.com/00000000/items/237ee0fba66ca5a3f12e

*/

console.log("foo");

const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

// let isProduction = false; 

const schema = buildSchema(`

  type Movie{
    id: Int
    title: String
    overview:String
    poster_path:String
    release_date:String
    popularity:Float
  }

  type Query {
    getPopularMovies:[Movie]
    getLatestMovie:Movie
    getTopRatedMovies:[Movie]
    getUpcomingMovies:[Movie]
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
  getLatestMovie: async () => {
    //Get a single latest movie.
    const latestMovie = await axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.APIKEY}&language=en-US`
    );
    console.log("latest movie: ", latestMovie.data);
    return latestMovie.data;
  },
  getTopRatedMovies: async () => {
    //Get the top rated movies on TMDB.
    const topRatedMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=en-US&page=1`
    );
    console.log("top rated movies: ", topRatedMovies.data.results);
    return topRatedMovies.data.results;
  },
  getUpcomingMovies: async () => {
    //Get a list of upcoming movies in theatres.
    const upcomingMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.APIKEY}&language=en-US&page=1`
    );
    console.log("upcoming movies: ", upcomingMovies.data.results);
    return upcomingMovies.data.results;
  },
};

console.log("bar");
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
console.log("process.env.PORT: ", process.env.PORT)
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

