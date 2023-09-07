import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class UnauthenticatedError extends CustomAPIError {
    statusCode = StatusCodes.UNAUTHORIZED;
    constructor(message: string) {
        super(message);
        this.statusCode;
    }
}

export default UnauthenticatedError;
