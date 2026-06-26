import { StatusCodes } from "http-status-codes"

function errorHandler(err, req, res, next)
{
    console.log(err.message);
    
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}

export default errorHandler