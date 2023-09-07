import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
    statusCode = StatusCodes.BAD_REQUEST
    constructor(message: string) {
        super(message);
        this.statusCode;
    }
}

export default BadRequestError;