const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const port = process.env.PORT || 8080;
const middlewares = jsonServer.defaults({ static: './dist/lgc-frontend-challenge' });

server.db = router.db;

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

server.use('/api', router);
server.use(middlewares);

server.all('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/lgc-frontend-challenge/index.html');
});

server.listen(port), {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE"],
        credentials: false
    }
}