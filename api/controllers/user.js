const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../util/database');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    isValidUser(req.body.email).then(result => {
        if (result.isUser) {
            res.status(409).json({
                message: "User Already Exists"
            });
        } else {
            user = {
                email: req.body.email,
                password: req.body.password
            };
            createUser(userInfo).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        }
    }).catch(errors => {
        res.status(404).json({
            error: errors
        });
    });
}

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

exports.userLogin = (req, res, next) => {
    const plainTextPassword = req.body.password;
    isValidUser(req.body.email).then(result => {
        if (result.isUser) {
            const user = result.user;
            checkPassword(user.password, plainTextPassword).then(correctPass => {
                if (correctPass) {
                    res.status(200).json({
                        user: user,
                        login: true,
                    });
                } else {
                    res.status(401).json({
                        message: "User email or password incorrect"
                    });
                }
            });
        } else {
            res.status(404).json({
                message: "An account has not been created with this email"
            });
        }
    });
};


//utility functions
const isValidUser = email => {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM user WHERE user_email = ?', [email],
            (errors, results, fields) => {
                if (errors) {
                    reject(errors);
                } else {
                    const isUser = results.length > 0 ? true : false;
                    const result = {
                        user: results,
                        isUser: isUser
                    };
                    resolve(result)
                }
            }
        );
    });
};

const createUser = userInfo => {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(userInfo.password, 10).then((hashedPassword) => {
            const newUser = {
                user_email: userInfo.email,
                password: hashedPassword
            };
            db.query(
                'INSERT INTO users SET ?', newUser, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        console.log(error);
                    } else {
                        console.log(results);
                        const response = {
                            message: 'User Created'
                        };
                        resolve(response);
                    }
                }
            )
        });
    });
};
const checkPassword = (dbPassword, userSubmittedPassword) => {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(dbPassword, userSubmittedPassword).then(isPassword => {
            resolve(isPassword);
        });
    });
}