const app = require('./server');
const dbConnect = require('./db');
const LoadInitialData = require('./data/loadInitialData');

const port = (process.env.PORT || 3000);

console.log("Starting API server at " + port);

dbConnect().then(
    () => {
        app.listen(port);
        console.log("Server ready!");
        
        /*Load initial data*/
        LoadInitialData();

        const HOST = process.env.SWAGGER_HOST || 'localhost:3000';
        
        /*Documentación Swagger*/
        const expressSwagger = require('express-swagger-generator')(app);
        let options = {
            swaggerDefinition: {
                info: {
                    description: 'FIS Group 5 Teams API',
                    title: 'Teams API',
                    version: '1.0.0',
                },
                host: HOST,
                basePath: '/api/v1',
                produces: [
                    "application/json"
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                   
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'x-access-token',
                        description: "",
                    }
                    
                }
            },
            basedir: __dirname, //app absolute path
            files: ['./docs/swagger/*.js'] //Path to the API handle folder
        };
        expressSwagger(options)
    },
    err => {
        console.log("Connection error: " + err);
        process.exit();
    }
);

