// express router
const router = require("express").Router();
const { Workout } = require("../models");

// add a workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// update workout
router.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } })
    .then((workout) => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get duration
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration", },
      },
    },
  ])
  .sort({ day: -1 })
  .then((workout) => {
    res.json(workout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// duration for a range
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
  .sort({ day: -1})
  .limit(7)
  .then((workout) => {
    res.json(workout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.delete('/routes/api.js',({ body }, res) =>{
  Workout.deleteOne({ _id: req.params.id })
  .then(() =>{
    res.json(true);
  })
  .catch((e) => {
    res.json(e);
  });
});


module.exports = router;