import * as modelUser from "./db/models/User.model";
declare global {
    namespace Express {
        export interface Request {
            version?: string;
            requestTime?: Date;
        }
        export interface User {
            id?: number;
            revoked_tokens?: string;
        }
        export interface AuthInfo {
            token?: any;
        }
    }
    export interface IVerifyOptions {
        role?: string,
        token?: string
    }
}
