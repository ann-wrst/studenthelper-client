const config = {}
config.redis ={
    url: "redis://localhost",
    host: "127.0.0.1",
    port: 57027,
}
config.session = {
    secret: "my-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    }
};
config.app = {
    port: 4000,
},
config.db  = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "mydb",
    dialect: "mysql",
    logging: false,
}

export default config;
