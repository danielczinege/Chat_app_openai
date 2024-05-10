export function exampleFunction(): IResponse {
    return {
        message: 'Hello, world!',
    };
}

export interface IResponse {
    message: string;
}


export class InternalError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
