

export class ErrorWithMessage extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}