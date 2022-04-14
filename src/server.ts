import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productsRoutes from './handlers/products';
import usersRoutes from './handlers/users';
import ordersRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors());
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

// setting up the routes
productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})