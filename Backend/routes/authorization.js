import passport from "passport";

import {Router} from "express";

import {login, register} from "../Controllers/AuthorizationController.js";

const router = Router();

export default app => {
    router.post("/login", login);
    router.post("/register", register);

    app.use('/api', router);
}