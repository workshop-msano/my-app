const helper = () => {

async function getPopularMovies() {
  let res = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
            getPopularMovies {
              id
              title
              overview
              poster_path
          }
        }`,
    }),
  });
  res = await res.json(); 
  return res.data.getPopularMovies; 
}}

module.exports = helper();
