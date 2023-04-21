const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 5001;
const app = express();

// CORS Middleware
app.use(cors());

// Proxy Middleware
app.all('/*', createProxyMiddleware({
    router: ({ path }) => new URL(path.substring(1)),
    pathRewrite: (pathloc, { path }) => (new URL(path.substring(1))).pathname,
    changeOrigin: true,
    logger: console
}));

app.listen(port, () => console.log(`Free From Cors at port ${port}`));