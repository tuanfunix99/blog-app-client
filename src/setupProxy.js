const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/api/*"],
    createProxyMiddleware({
      target: process.env.REACT_APP_HTTP_API_LINK_URL,
      changeOrigin: true,
    })
  )
};