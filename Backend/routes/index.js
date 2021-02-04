import {Router} from "express";
import passport from "passport";

const router = Router();

export default app => {
    router.get("/", (req, res) => {
        res.send(JSON.stringify({ message: "Pong!" }))
    });

    app.use('/api', router);
}
