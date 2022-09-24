const helper = {
  popular: async () => {
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
  },
  top: async () => {
    let res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
            getTopRatedMovies {
              id
              title
              overview
              poster_path
         }
        }`,
      }),
    });
    res = await res.json();
    console.log("res", res);
    return res.data.getTopRatedMovies;
  },
};

export default helper;
