const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../util/database');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    db.query(
        'SELECT * FROM `users` WHERE user_email = ? ',
        [email],
        (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    const user = {
                        user_email: req.body.email,
                        password: hash
                    };
                    if (results.length === 0) {
                        db.query(
                            'INSERT INTO users SET ?', user, (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(results);
                                    res.status(200).json({
                                        message: 'User Created'
                                    });
                                }
                            }
                        )
                    }
                });
            }
        });
};

exports.getAllUsers = (req, res, next) => {
    db.query(
        'SELECT * FROM workout_user', (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
            }
        }
    );
};

exports.deleteUser = (req, res, next) => {
    const email = req.body.email;
    db.query('DELETE FROM workout_user WHERE user_email=?',
        [email],
        (error, results, fields) => {
            if (error) {
                res.status(400).json({
                    error: error
                });
            } else {
                console.log(results);
                res.status(200).json({
                    message: 'User Deleted'
                });
            }
        });
};

exports.checkUser = (email) => {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM workout_user WHERE user_email = ?', [email],
            (errors, results, fields) => {
                if (errors) {
                    reject(errors);
                } else {
                    if (results.length === 0) {
                        const error = {
                            message: 'No User Found',
                            status: 404
                        };
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                }
            }
        );
    });
};