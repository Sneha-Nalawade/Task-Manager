const mongoose = require('mongoose')

//updated the pwd value for the database under Mau2DB and the file name to db TASK-MANAGER (will create this if not already present:))
// as we can see, our password is clearly visible in the above included url, and so once we upload this entire code as a repository in github etc, this will be publicy visible and anyone can access my db/account and tamper the data;
// therefore we use/set this as environment variables, and include that env inside the gitignore file so that it(this url) is hidden, and not visible to others, nor is modifiable by them


const connectDB = (url) => {
    return mongoose
    .connect(url //, { //need not use this 2nd parameter (the following content inside the curly braces) incase of v6 and above i.e. even in this case rn(if used/written now, it gives an error!!
            //  useNewUrlParser: true,
            //  useCreateIndex: true,
            //  useFindAndModify: false,
            //  useUnifiedTopology: true,
            // }
            )
}

module.exports = connectDB;

                //we're ensuring that first a successful connection to the db is established and only if it succeeds should the server start listening to the requests
        // .then(()=>{ console.log('CONNECTED TO THE DB...');})
        // .catch((err)=>{ console.log(err);}); //implementing promises