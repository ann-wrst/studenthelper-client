import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {models} from '../config/dbConnect.js';

const User = models.user;
const saltRounds = 6;

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function Verify({email, password}) {
    if (!email) {
        return {
            success: false,
            status: 200,
            message: `Field email can not be empty!`

        };
    } else if (!password) {
        return {
            success: false,
            status: 200,
            message: `Field password can not be empty!`

        };
    }
    if (!emailPattern.test(email.trim())) {
        return {
            success: false,
            status: 200,
            message: `Invalid email.`
        };
    }
    return {
        success: true,
        status: 200,
        message: `validation confirm`
    }
}

export async function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let verify = Verify(req.body);

    if (!verify.success) {
        res.status(verify.status).send({
            success: verify.success,
            message: verify.message
        })
        return;
    }

    try {
        let FoundUser = await User.findOne({where: {email: email}});
        if (FoundUser) {
            bcrypt.compare(password, FoundUser.password, (error, result) => {
                if (error) {
                    res.status(500).send({
                        success: false,
                        message: error.message
                    });
                }
                if (result) {
                    res.status(200).send({
                        success: true,
                        message: `Password is correct.`
                    });
                } else {
                    res.status(200).send({
                        success: false,
                        message: `Password isn't correct.`
                    });
                }
            });
        } else {
            res.status(200).send({
                success: false,
                message: `User not found.`
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err
        });
    }
}

export async function register(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let verify = Verify(req.body);

    if (!verify.success) {
        res.status(verify.status).send({
            success: verify.success,
            message: verify.message
        })
        return;
    }

    try {
        let FoundUser = await User.findOne({where: {email: email}});
        if (!FoundUser) {
            let CreateUser = await User.create({
                idUser: uuid(),
                username: req.body.username | "user", //TODO: trim username.
                email: email,
                password: await bcrypt.hash(password, saltRounds)
            });
            if (CreateUser) {
                res.status(200).send({
                    success: true,
                    message: "User is created."
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: "idk"
                });
            }
        } else {
            res.status(200).send({
                success: false,
                message: "Email is taken."
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err
        });
    }
}