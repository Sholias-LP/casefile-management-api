import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const router = express.Router()

const swaggerJsDocs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Casefile Management API',
            version: '1.0.0',
            description: 'A Casefile management API which tracks, and records the tasks, history, and comments that are associated with the case. [Click to see live preview](https://casefile-management-api.herokuapp.com/)',
            contact: {
                name: 'API Support',
                email: 'giwajossy@gmail.com',
                url: 'https://github.com/giwajossy'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            }
        },
    },
    servers: [
        {
            url: 'https://localhost:3000/',
            description: 'Developmenent server'
        },
        {
            url: 'https://casefile-management-api.herokuapp.com/',
            description: 'Production server'
        }
    ],
    apis: ['./src/spec/*.yml', './src/spec/components/*.yml']
});


router.use('/', swaggerUI.serve)
router.get('/', swaggerUI.setup(swaggerJsDocs));

export default router;
