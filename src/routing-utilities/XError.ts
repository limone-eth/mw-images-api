import {CustomError} from "./CustomError";
export class XError extends Error {

    constructor (public CError: CustomError, public status: number, public message: string, public metaData?: any){
        super(message);
    }
}


