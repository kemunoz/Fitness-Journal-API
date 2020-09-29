const express = require('express');
const router = express.Router();
const db = require('../util/database');

router.get('/getAllWorkouts', (req, res, next) => {
    db.query('SELECT * FROM workouts', (errors, results, fields) => {
        console.log(results);
    });
});
router.post('/addWorkout', (req, res, next) => {
    db.query('SELECT id FROM workout_user WHERE user_email=?', [req.body.email],
        (error, results, fields) => {
            console.log(results);
            const workout = {
                workout_name: req.body.workout_name,
                userid: results[0].id,
                notes: req.body.notes
            };
            db.query('INSERT INTO workout VALUES SET ?',
                workout,
                (errors, results, fields) => {
                    if (error) {
                        res.status(400).json({
                            message: errors
                        });
                    }
                    res.status(201).json({
                        message: 'Workout Created'
                    });
                });
            console.log(results[0].id);
            res.status(200).json({
                message: results
            });
        });
});

router.post('/deleteWorkout', (req, res, next) => {
    //req body should hold workout id
    db.query('DELETE FROM workout WHERE workout_id = ?', [req.body.workoutid],
        (errors, results, fields) => {
            if (errors) {
                res.status(400).json({
                    error: error
                });
            } else {
                res.status(200).json({
                    result: results
                });
            }
        });
});

router.get('/getAllUserWorkouts', (req, res, next) => {
    db.query('SELECT * FROM workouts WHERE userid = ?', [req.body.userid],
        (errors, results, fields) => {
            if (errors) {
                res.status(400).json({
                    error: errors
                });
            } else {
                res.status(200).json({
                    result: results
                });
            }
        });
});

router.get('/getAllWorkoutExercises', (req, res, next) => {
    db.query('SELECT * FROM exercises WHERE workoutid = ?', [req.body.workoutid],
        (errors, results, fields) => {
            if (errors) {
                res.status(400).json({
                    error: errors
                });
            } else {
                res.status(200).json({
                    result: results
                });
            }
        });
});

router.post('/deleteAllUserExercises', (req, res, next) => {
    const workoutId = req.body.workoutId;
    db.query('DELETE FROM exercises WHERE workoutid=?', [workoutId],
        (errors, results, fields) => {
            if (errors) {
                res.status(200).json({
                    error: errors
                });
            } else {
                res.status(200).json({
                    results: results
                });
            }
        });
});

module.exports = router;