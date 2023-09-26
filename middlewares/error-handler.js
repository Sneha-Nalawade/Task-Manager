const {CustomAPIError} = require('../errors/custom-error');  //object destructuring implemented using {} to ensure that only the required part from the entire exported module is imported/required and stored in a similar-named variable

//to handle the 500 status waala error in next(err) of asyncwrapper middlewares
const errorHandlerMiddleware = (err, req, res, next) => {
    // res.status(500).json({msg: err});
    // res.status(500).json({msg: `Something went wrong, try again later!`});

    // console.log(err);
    // res.status(err.status).json({ msg: err.message});

    if(err instanceof CustomAPIError) //we're therefore requiring the CustomAPIError class instead of createCustomError function bcoz we want to check if the err matches the structure of the 404 waala customAPIError class's structure or not(i.e. if err is CustomAPIError's object, and hence that type pf error or not)
    {
        return res.status(err.statusCode).json({msg: err.message});
    }    
     return res.status(500).json({msg: 'Something went wrong, plz try again'});
}

module.exports = errorHandlerMiddleware;