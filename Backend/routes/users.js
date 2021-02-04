import {Router} from "express";
import {update, findAll, findOne} from "../Controllers/UserController.js";

const router = Router();

export default app => {
    router.get("/", findAll);
    router.get('/:idUser', findOne);
    router.put("/:idUser", update);

    app.use('/api/users', router);
}