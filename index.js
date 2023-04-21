const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 5001;
const app = express();

// CORS Middleware
app.use(cors());

// Proxy Middleware
app.use(createProxyMiddleware({
    router: (req) => new URL(req.path.substring(1)),
    pathRewrite: (req) => (new URL(req.path.substring(1))).pathname,
    changeOrigin: true,
    logger: console
}));

app.listen(port, () => console.log(`Free From Cors at port ${port}`));