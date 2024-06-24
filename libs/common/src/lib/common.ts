export interface IResponse {
    message: string;
}

export interface Conversation {
    id: number;
    title: string;
}

export class InternalError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
