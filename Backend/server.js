import express from 'express';
import bodyparser from 'body-parser';
import passport from 'passport'; //TODO: PASSPORT
import redis from 'redis';
import connect_redis from 'connect-redis';
import session from 'express-session';
import cors from 'cors';

import {sequelize} from './config/dbConnect.js';
import config from './config/config.js';
import logger from "./logger.js";

//routes
import routes_index from './routes/index.js';
import routes_users from './routes/users.js';
import routes_authorization from './routes/authorization.js';

const {json, urlencoded} = bodyparser;
const RedisStore = connect_redis(session);

(async () => {
    const app = express();

    app.use(
        session({
            store: new RedisStore({
                client: redis.createClient({
                    host: config.redis.host
                })
            }),
            ...config.session
        })
    )

    app.use(passport.initialize({}));
    app.use(passport.session({}));
    app.use(cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    }));

    app.use(json());
    app.use(urlencoded({extended: true}));

    logger(app);

    routes_index(app);
    routes_users(app);
    routes_authorization(app);

    try {
        if (await sequelize.sync()) {
            app.listen(config.app.port, () => {
                console.log(`Server is listen on ${config.app.port} \n`);
            });
        }
    } catch (err) {
        console.log(err);
    }
})();
