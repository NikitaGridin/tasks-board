export const ERROR_CODES = {
    UNKNOW_ERROR: "UNKNOW_ERROR",
    INCORRECT_AUTH_DATA: "INCORRECT_AUTH_DATA",
    UNAUTHORIZED: "UNOTHORIZED",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
};

export class CustomError {
    error: { message: string; code: string };
    constructor({ code, message }: { code: string; message: string }) {
        this.error = {
            message,
            code,
        };
    }

    toJson() {
        return { error: this.error };
    }
}
