const db = require('../util/database');
const express = require('express');

const workoutEnums = {
    BENCH_PRESS: 1,
    INCLINE_DB_PRESS: 2,
    DB_OVERHEAD_PRESS: 3,
    INCLINE_DB_PRESS: 4,
    TRICEP_PUSHDOWN: 5,
    OVERHEAD_TRICEP_EXTENSION: 6,
    LATERAL_RAISE: 7,
    BARBELL_ROW: 8,
    PULLDOWN: 9,
    CHEST_SUPPORTED_ROWS: 10,
    FACE_PULLS: 11,
    HAMMER_CURLS: 12,
    DB_CURLS: 13,
    SQUAT: 14,
    RDL: 15,
    LEG_PRESS: 16,
    LEG_CURLS: 17,
    CALF_RAISES: 18,
    CHEST_FLYS: 19,
    LEG_EXTENSIONS: 20
}

exports.getAllWorkouts = (req, res, next) => {
    db.query('SELECT * FROM workouts', (errors, results, fields) => {
        console.log(results);
    });
};

exports.addWorkout = (req, res, next) => {
    db.query('SELECT id FROM user WHERE user_email=?', [req.body.email],
        (error, results, fields) => {
            console.log(results);
            const workout = {
                workout_name: req.body.workout_name,
                userid: results[0].id,
                notes: req.body.notes
            };
            db.query('INSERT INTO workouts VALUES SET ?',
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
        }
    );
};

exports.deleteWorkout = (req, res, next) => {
    db.query('DELETE FROM workouts WHERE workout_id = ?', [req.body.workoutid],
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
};

exports.getAllUserWorkouts = (req, res, next) => {
    db.query('SELECT * FROM workouts WHERE user_id = ?', [req.body.userid],
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
};

exports.getWorkoutExercises = (req, res, next) => {
    db.query('SELECT * FROM exercises WHERE workout_id = ?', [req.body.workoutid],
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
};