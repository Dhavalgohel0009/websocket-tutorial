import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Express API',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
    },
    apis: [
        "./routes/index.js"
        // Path to your API
    ]
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);