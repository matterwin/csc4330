import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class UnauthorizedError extends CustomAPIError {
    statusCode = StatusCodes.FORBIDDEN;
    constructor(message: string) {
        super(message);
        this.statusCode;
    }
}

export default UnauthorizedError;