export class XLoDash {
    static cleanObject(obj: any) {
        for (const key of Object.keys(obj)) {
            const o = JSON.stringify(obj[key]);
            if (o === undefined || o === "null" || o === "{}") {
                delete obj[key];
            }
        }
        return obj;
    }

    static excludeFieldsFromObject(obj: any, fieldsToBeExcluded: string[]) {
        const e: any = {};
        for (const key of Object.keys(obj)) {
            if(fieldsToBeExcluded.indexOf(key) === -1) {
                e[key] = obj[key];
            }
        }
        return e;
    }
}
