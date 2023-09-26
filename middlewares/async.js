// async wrappers are middlewares used with controllers to reduce the code redundancy of using try-catch block separately each-time
const asyncWrapper = (fn) => {   //fn- function/ call-back function
   return async (req, res, next) => {  //since the async controllers are getting passed in as parametersto this asyncWrapper, therefor its component parameters i.e. req, res and next will also be present here by default and u can and should take it as input parameters for the async functions
    try {
        await fn(req, res, next)  //await used here....so this behaves like a promise
    } catch (error) {  //error will be handled by next()
        next(error) //error if any, will be catched here, and we'll create another middleware to handle the error 
    }  //remember: with next(), we can pass it(the flow of exectution) to the next middleware....our custom error handler in this case (as ccn be seen from app.js)
   }
}

module.exports = asyncWrapper;

//in Express, a default built-in error handler comes with their official pre-defined middleware stack.
//so if some error is not handled in the custom way by the user, it will then be handled by this default error handler of express (in programs using and importing/requiring express ofc)