export default (app) => {
    app.use((req, res, next) => { //logger
        let log = {
            header: req.headers,
            url: req.url,
            method: req.method
        }
        console.log(log);
        next();
    });
}
