// mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Enter workout type "
    },  
    name: {
      type: String,
      trim: true,
      required: "Enter workout name "
    },  
    duration: {
      type: Number,
      required: "Enter workout duration in minutes "
    },
    weight: {
      type: Number,
      required: "Enter workout weight in lbs "
    },
    reps: {
      type: Number,
      required: "Enter number of workout reps "
    },
    sets: {
      type: Number,
      required: "Enter number of workout sets "
    },
    distance: {
      type: Number,
      required: "Enter workout distance in miles "
    }
  }]
});

// instantiate
const Workout = mongoose.model("Workout", workoutSchema);

// exports
module.exports = Workout;