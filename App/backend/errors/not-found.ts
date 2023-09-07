import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class NotFoundError extends CustomAPIError {
    statusCode = StatusCodes.NOT_FOUND
    constructor(message: string) {
        super(message);
        this.statusCode;
    }
}

export default NotFoundError;