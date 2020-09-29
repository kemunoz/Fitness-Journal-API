const express = require('express');
const router = express.Router();
const WorkoutController = require('../controllers/workouts');


router.get('/getAllWorkouts', WorkoutController.getAllWorkouts);
router.get('/getAllUserWorkouts', WorkoutController.getAllUserWorkouts);
router.get('/getAllWorkoutExercises', WorkoutController.getWorkoutExercises);
router.post('/addWorkout', WorkoutController.addWorkout);
router.post('/deleteWorkout', WorkoutController.deleteWorkout);

module.exports = router;