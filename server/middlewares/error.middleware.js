const errorHandler = (err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    const errObj = {
        success:false,
        statusCode:status, 
        message
    }
    res.status(status).json(errObj)
}

module.exports = errorHandler