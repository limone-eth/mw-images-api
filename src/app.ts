import express from 'express';
import * as bodyParser from 'body-parser';
import {IndexRoute} from "./api";
import {connect} from './db/db';
import "reflect-metadata";
import {ErrorHandler} from "./components/ErrorHandler";
import {PassportComponent} from "./components/Passport"
import {Image} from "./db/models/Image.model";
import {XError} from "./routing-utilities/XError";
import * as path from "path";
import {Authenticator} from "./middlewares/Authenticator";
import cors from "cors";

import {NextFunction, Request, Response} from "express";
import * as fs from "fs";

connect().then(() => {
    console.log('DB CONNECTED');
}).catch((err) => {
    console.log(err);
}); // initialize DB Connection


const passport = new PassportComponent();

// Express starts here!
const app = express();
app.use(cors({origin:true,credentials: true}));
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
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next()
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.version = req.header('accept-version');
    req.requestTime = new Date();
    next();
});

app.use(passport.p().initialize());


function authorize() {
    const authenticator = new Authenticator('user');
    return (req: Request, res: Response, next: NextFunction) => {
        authenticator.authorize(req, res, next)
    }
}

app.get('/download/:id', authorize(), async (req, res, next) => {
    const users_id = req.user.id;
    const id = req.params.id;
    const image = await Image.findOne({
        where: {
            id,
            users_id,
            view: 1
        }
    });
    if (!image) {
        res.status(404).send({message: "Image not found or not belonging to current user"})
    }
    const imagePath = __dirname + '/../../images/' + users_id + '/' + image.key + '.png';
    res.setHeader('Content-disposition', 'attachment; filename=' + image.key + '.png');
    res.setHeader('Content-type', 'image/png');
    const filestream = fs.createReadStream(imagePath).on('close', () => {
        console.log('done');
    });
    filestream.pipe(res);
});
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
