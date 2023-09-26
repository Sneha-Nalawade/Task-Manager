const Task = require('../models/Task');

//inorder to refrain from using this redundance of try-catch blocks in every single controller individually, we will use another way of a more efficient code instead (using async middlewares).
//so we're commenting out the below 5 blocks of controllers, and writing a more efficient code below them...do scroll down & see!
const asyncWrapper = require('../middlewares/async');

const {createCustomError} = require('../errors/custom-error');

// //one of the parameters of the Models.find() method of Mongoose is 'filter' :- if no object/parameter/condition waala kuch passed inside the Models.find() parenthesis...then all the documents will be displayed/returned (i.e. all tasks rendered)
// const getAllTasks = async (req, res) => {
//     try{
//        const tasks = await Task.find({});
//        res.status(200).json({ tasks }); //.json(tasks: tasks) written in short as .json(tasks) since we can do this if both (property name and its value) have same name
//          //tasks will have whatever value it is getting passed on from find()
//          // alternate responses that could have also been passed (anyone of these instead of the one above) {but if you're developing for a frontend, do make it work..try to be uniform in all your routes, and use the above used response itself}
//          // res.status(200).json({tasks, amount:tasks.length})
//          // res.status(200).json({status: 'success', data: {tasks, nbHits: tasks.length}})
//          // res.status(200).json({success:true, data: {tasks, nbHits: tasks.length}})
         
//     } catch (error) {
//        res.status(500).json({ msg: error});
//     }
// }

// const createTask = async (req, res) => {  //we're declaring this method to be of type async since we'll be using await next
//     try {
//         const task = await Task.create(req.body); //we can also use callback function instead of await. Task is out model, and Task.create() will create a new document(item/object) in accordance to the defined schema. task will only store the fields specified inside schema, since we're assigning it to .create() method...
//         res.status(201).json({ task }); //status code 201 means that the corresponding post request has executed successfully. res.json({task}) will make the req.body part that will be passed on to the db be visible in json format on the postman API screen
//     }
//     catch (error) {
//         //res.status(500).send('Error: Invalid entry!');
//         res.status(500).json({msg: error}); //500->general server error
//     }
//     //we use try-catch block so that even when the user enters something against the validation rules while creating a new task, the server handles it while displaying an error msg, instead of abruptly terminating the program with some bulky error msg
//     // another way of thinking this- we use await & async methods here, so the program will keep waiting incase of inputs against our validations....so the program will not actually terminate but will rather not end, and be stuck there, waiting (which is even worse), so we need to enclose it inside try-catch to prevent such possibilities
// }

// const getTask = async (req, res) => {
//     try {
//        const {id:taskID} = req.params;
//        const task = await Task.findOne({_id:taskID})  //it'll find that one doc/item matching this condn of _id=taskID
//        if(!task)
//        {
//         return res.status(404).json({ msg:`No task with id: ${taskID}`}); //incase the given id is valid but not existent as a task in the db
//        }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({msg: error}); //incase of invalid id input (like wrong string length etc)
//     }
// }

// const updateTask = async (req, res) => {  
//     const {id:taskID} = req.params;
//     try {     //using await very imp here(i.e. in the following line)!
//       const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {  //these are option objects (the ones inside this curly braces after req.body)
//        new: true, //this will always return the new/updated item on running the update method...(as opposed to the original content which was getting displayed earlier)
//        runValidators: true  
//     });             //if option objects aren't used; in postman: on passing an updated req.body to the update method, the original item body will be displayed on the terminal
//       // and the updated item will be visible instead of the original one in the getAllTasks method...so to prevent all of such ambiguity, we'll be using option objects..and we can also validate the new/to be updated info before accepting it through this
//     if(!task)
//     {
//         return res.status(404).json({msg: `No object with id: ${taskID}`});
//     }
//      res.status(200).json({ task });
//     } catch (error) {
//      res.status(500).json({msg: error});
//     }
// }

// const deleteTask = async (req, res) => {
//     try {
//         const {id:taskID} = req.params;
//         const task = await Task.findOneAndDelete({_id: taskID});
//         if(!task)
//           return res.status(404).json({msg: `No task with id: ${taskID}`});
//         res.status(200).json({task});
//         //(or) res.status(200).send() //(or) res.status(200).json({task:null, status:'success'});

//     } catch (error) {
//         res.status(500).json({msg: error});
//     }
// }

//using async wrappers - (to prevent redundancy of try-catch in the code)
const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async(req, res) =>
{
   const task = await Task.create(req.body);
   res.status(201).json({ task });
})

const getTask = asyncWrapper(async(req, res, next) => {  //next-> since we'll need it to pass on the flow to the custom error handler incase of (!task)===true
    const {id:taskID} = req.params;
    const task = await Task.findOne({_id:taskID});
    // if(!task)
    // {
    //     return res.status(404).json({msg: `no task with id: ${taskID}`});
    // }

    if(!task) {
        // const error = new Error('Not Found');  //creating a new error object by using/running the built-in JS error constructor
        // error.status=404;
        // return next(error);
        
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
     res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async(req, res) => {
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task) {
        // res.status(404).json({msg: `No task with id: ${taskID}`});
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrapper(async(req, res) => {
    const {id:taskID} = req.params; //req.params se uthaya tha id ko (i.e. req.id ko), aur usko rename kiya as taskID
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!task)
    {
        // res.status(404).json({msg: `No task with id: ${taskID}`});
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
})

module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask};

//json is the standard format to receive and send data in REST API, hence we'll prefer using res.json() instead of res.send()
//RESTful API is not a compulsory set of rules, but rather is a widely used format/pattern of writing urls; we can however also design & use urls in our custom pattern instead of RESTful