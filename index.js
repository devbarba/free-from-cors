const express = require('express');
const qs = require('querystring');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 5001;
const app = express();

// CORS Middleware
app.use(cors());

// Proxy Middleware
app.use(createProxyMiddleware({
    changeOrigin: true,
    logger: console,
    router: ({ path }) => new URL(path.substring(1)),
    pathRewrite: (lpath, { method, path, query }) => {
        let newPath = (new URL(path.substring(1))).pathname;

        if (method === 'GET') {
            const newQuery = { ...query };
            if (/_csrf=/.test(newPath)) delete newQuery._csrf;
    
            if (Object.keys(newQuery).length) {
                newPath = `${newPath.split('?')[0]}?${qs.stringify(newQuery)}`;
            } else {
                newPath = `${newPath.split('?')[0]}`;
            }
        }
    
        return newPath;
    }
}));

app.listen(port, () => console.log(`Free From Cors at port ${port}`));