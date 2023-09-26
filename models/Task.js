const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//     name:String, completed:Boolean
// })   //we'll use validators to ensure that the required properties are entered correctly each time when a new task is created
//while using validators, we'll define the individual properties of schema as object having multiple sub-attributes, like name having sub-attributes like type, required, trim, and maxlength
//validation is a feature of Mongoose (so u can read more about it from mongoose ke official documentation)

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true //this would mean that it'll give an error if this property is not passed inside req.body (every task must have a name to identify). so will pass an error incase the name field is not at all defined or even when this field is mentioned but a null value is passed to it
        required: [true, 'must provide name'],  //whenever such an array used, in it the 1st parameter is for when that particular field is true, and the latter one when false. so here it means that if required is true(i.e. name fields present in the passed req.body), its fine, but if its false then it'll pass the 'must provide name' msg/warning!
        trim: true,  //will trim the extra spaces on either side of the entered string(name)
        maxlength: [20, 'name cannot be more than 20 characters'] //maxlength of the name String
    },
    completed: {
        type: Boolean,
        default: false //completed is not required, and when not passed in the req.body, its default value is set to false for that particular task
    }
})

module.exports = mongoose.model('Task', TaskSchema)