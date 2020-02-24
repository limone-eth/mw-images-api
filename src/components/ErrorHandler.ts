import * as express from "express";

export class ErrorHandler {

    errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction): any {
        if (err && err instanceof SyntaxError) return res.sendStatus(500);
        /*new Logger().log('error-handler').error(err, 'express-level error', {
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip
        });*/
        return res.sendStatus(500);
    }
}
