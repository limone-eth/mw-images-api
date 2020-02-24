import express from 'express';
import * as bodyParser from 'body-parser';
import {IndexRoute} from "./api";
import {connect} from './db/db';
import "reflect-metadata";
import {ErrorHandler} from "./components/ErrorHandler";
import {PassportComponent} from "./components/Passport"

connect(); // initialize DB Connection

const passport = new PassportComponent();

// Express starts here!
const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'j2');
app.set('x-powered-by', false); // disable x-powered-by header
app.set('trust proxy', 1); // use X-Forwarded-For header


// ***** Local env only ****
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-team");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next()
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.version = req.header('accept-version');
    req.requestTime = new Date();
    next();
});

app.use(passport.p().initialize());
app.use('', new IndexRoute().initRouter());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
});

app.all('*', (req: express.Request, res: express.Response) => {
    throw new Error("Bad request")
});
app.use((e: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (e.message === "Bad request") {
        res.status(400).json({message: e.message});
    }
});
app.use(new ErrorHandler().errorHandler);

export {app};
