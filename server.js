const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
// const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require("axios");
require('dotenv').config();
const cors = require('cors')

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
  // createProxyMiddleware({
  //   target: 'http://localhost:4000/graphql',
  //   changeOrigin: true,
  // }),
);

app.listen(4000, () => console.log("Server on port 4000"));
