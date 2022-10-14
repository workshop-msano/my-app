const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // if (process.env.PORT !== "8080") {
  //   app.use(
  //     "/graphql",
  //     createProxyMiddleware({
  //       target: "http://localhost:4000/graphql",
  //       changeOrigin: true,
  //     })
  //   );
  // } else {
  //   app.use(
  //     "/graphql",
  //     createProxyMiddleware({
  //       target: "https://mmmovie.fly.dev/graphql",
  //       changeOrigin: true,
  //     })
  //   );
  // }

    app.use(
      "/graphql",
      createProxyMiddleware({
        target: "http://localhost:4000/graphql",
        changeOrigin: true,
      })
    );
    console.log(`proxy page`)
    console.log(`process.env.PORT: ${process.env.PORT}`)

};

/*
graphqlの場合proxyの設定がpackage.jsonではできない

//Configuring the Proxy Manually
https://stackoverflow.com/questions/62236347/is-it-possible-to-proxy-the-html-get-request-to-graphql-from-a-create-react-app

//Is it possible to proxy the html get request to /graphql from a create-react-app?
https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
*/
