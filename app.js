const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

require('dotenv').config()

//middlewares
app.use(express.static('./public'))
app.use(express.json())  //if this statement is not written, the added tasks info won't be present in the req.body

//routes
// app.get('/hello', (req, res) =>{
//     res.send("Task Manager App");
// })

app.use('/api/v1/tasks', tasks)

app.use(notFound) //if the above app.use not executed (i.e. a valid url of type /api/v1/tasks not passed), then this app.use for not-found will be run instead
app.use(errorHandlerMiddleware) //to handle the 500 status waala error in next(err) of asyncwrapper middlewares

//app.get('/api/v1/tasks')        -get all the tasks (list)
//app.post('/api/v1/taks')        -craete a new task
//app.get('/api/v1/tasks/:id')    -get single task
//app.patch('/api/v1/tasks/:id')  -update/edit task
//app.delete('/api/v1/tasks/:id') -delete task

//'/api/v1' is used in these req urls just to logically keep then separate from other requests not involving apis (/api)
//and to ensure that we can route req to res correctly in case of multiple variations or versions (/v1)

// const port = 3000;
const port = process.env.PORT || 3000 //this is done coz while we're deploying this application, the hosting platform will assign whatever port is free among all its port to this program(since it has multiple applications running and hence many busy ports),
//so we cannot setup/assign a single hard-core value like 3000 for the port there, but rather use env variables to enable it to use one of the available ports on the server once its deployed.
//at the same time, we are assigning the port:3000 value in OR option in the same line, so that when we're running this program locally in our pc, this port is used instead.

//we will use async method since we're using promises (mongoose.connect(), and then we can also use await...)
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI) //process.env is a global variable
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
}

start()

//CRUD - create, read, update, delete/destroy
//we will create .gitignore folder, and include 2 files within it:-1) .env - to ensure that certain info (connectionString in this case) remains secret/hidden from others;
// 2) node modules - coz this is quite a big module, and need not neccesarily be transferred while uploading the code as it can always be included by running npm install

//we can access the variables defined inside .env from anywhere inside the application using - process.env.<variablename>

// in noSQL (mongodb for instance), collection<->tables (collection of items); documents<->each row in sql(single item)
// mongoose helps use define structure for the data we'll be working upon:- model for collection & schema for documents; and mongoose also provides straight forward APIs

//since we set-up our schema, only the properties that are specified inside the schema will get passed on to the database(which(created items and their listed properties that were saved in the db) can be seen in mongodb atlas)
// so even if u input additional fields through request body, it won't give an error, but those extra fields wont be passed on(i.e. effectively they'll be just ignored)


// 1) installed basic necesities like nodemon, express etc, and wrote basic initial lines of code for server.listen and certain requires
// 2) figured out all the needed types of requests and tasks to be implemented in the program (gettask, posttask, delete etc)
// 3) created folders like routes, controllers, public etc, and checked if the established routing between all of them is working properly by using postman APIs
// 4) also saved these routes/urls as global ones in postman
// 5) created account on Mongodb Atlas, created a new collection for this application inside it, and also installed mongoose inside our program code
//    mongoose is a library providing various functionalities for working with & connecting MongoDB and Node.js appa, one being that it allows us to define a proper structure for data schema
// 6) established connection between our application and the DB, using mongoose and promises, async & await methods
// 7) used environment variables and also created .gitignore file
// 8) defined the schema for models using mongoose
// 9) implemented different tasks using middlewares and controllers
// 10) ensured proper error handling and non-redundancy in code 
// 11) User Authentication, including additional packages, and ensuring Security left before deploying the project 



// put method: replaces the entire stuff with the new one i.e. overwrites the original one completely
//             i.e. you're trying to replace the existing resource
// patch method: for partial update
// since in this app, we want that the part of task for whom a new value is entered should get updated but the remaining part should remain as original rather than getting erased or something...so we used the patch method here!

//but by default, mongoose makes put method behave just like patch (i.e. the properties not passed while updating will remain the same rather than getting removed).
//inorder to remove the ones not mentioned/specified during the update, i.e. to completely update....add another option in optional object:- overwrite: true (after new:true, runValidators: true), and also comment out the line setting any default value for those properties if any such exists

//we won't currently be deploying this project due to few reasons- 1. we have not covered Authentication here yrt, and hence any user can edit the data that is common and accessible to all...i.e. anyone can tinker the overall data
// 2. not included extra packages or security