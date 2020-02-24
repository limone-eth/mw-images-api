import {NextFunction, Request, Response} from "express";
import {Route} from "./Route";
import {PathRoute} from "./PathRoute";
import * as express from "express"
import {Authenticator} from "../middlewares/Authenticator"
import {XError} from "./XError"
import {Validator} from "../middlewares/Validator";
import * as _ from 'lodash'
import {XLoDash} from "../utils/XLoDash";

export abstract class AbstractRoutes {


    abstract initializeRoutes(): Route[]

    abstract initializePathRoutes(): PathRoute[]

    initRouter(): express.Router {
        const router = express.Router();
        for (const route of this.initializeRoutes()) {

            const authorize = this.authorize(route); // AUTHENTICATION
            const validate = this.validate(route); // VALIDATION
            const exec = this.exec(route); // EXECUTION
            switch (route.method) {
                case MethodRoutes.GET:
                    router.get(route.endpoint, authorize, validate, exec);
                    break;
                case MethodRoutes.POST:
                    router.post(route.endpoint, authorize, validate, exec);
                    break;
                case MethodRoutes.PUT:
                    router.put(route.endpoint, authorize, validate, exec);
                    break;
                case MethodRoutes.DELETE:
                    router.delete(route.endpoint, authorize, validate, exec);
                    break;
            }

        }

        for (const route of this.initializePathRoutes()) {
            router.use(route.path, route.route.initRouter())
        }

        return router;
    }


    authorize(route: Route) {
        const authenticator = new Authenticator(route.requestedRole);
        return (req: Request, res: Response, next: NextFunction) => {
            if (!route.requestedRole) {
                next();
            } else {
                authenticator.authorize(req, res, next)
            }
        }
    }

    exec(route: Route) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const version = req.header('accept-version') || 'v1';
                res.send(await (route.classes[version].exec(req, res, next)));
            } catch (err) {
                if (err instanceof XError) {
                    res.status(err.status).json({
                        error: err.CError,
                        message: err.message
                    });
                } else if (err instanceof Error) {
                    res.status(500).json({
                        error: {
                            code: -1,
                            keyword: err.name
                        },
                        message: err.message
                    });
                }
            }
        };
    }

    validate(route: Route) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const version = req.header('accept-version') || 'v1';
            if (route.classes[version].validate) {
                const validationReq = {
                    body: req.body,
                    query: req.query,
                    params: req.params
                };
                return await Validator.validates(route.classes[version].validate, XLoDash.cleanObject(validationReq), res, next);
            } else {
                next();
            }

        }
    }
}


export enum MethodRoutes {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}




