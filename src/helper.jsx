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
    return res.data.getTopRatedMovies;
  },
  upcoming: async () => {
    let res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
            getUpcomingMovies {
              id
              title
              overview
              poster_path
         }
        }`,
      }),
    });
    res = await res.json();
    return res.data.getUpcomingMovies;
  },
  latest: async () => {
    let res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
            getLatestMovie {
              id
              title
              overview
              poster_path
         }
        }`,
      }),
    });
    res = await res.json();
    console.log("data from res: ", res.data.getLatestMovie);
    return res.data.getLatestMovie;
  },
};

export default helper;
