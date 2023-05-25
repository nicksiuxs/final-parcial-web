const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
    latitud: {
        type: String,
        require: true
    },
    longitud: {
        type: String,
        require: true
    },
    room: {
        type: String,
        require: true
    },
});


module.exports = model("Task", TaskSchema);