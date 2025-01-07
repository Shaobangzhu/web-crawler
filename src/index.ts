import express from "express";
import router from "./router";
import cookieSession from "cookie-session";

const app = express();
const port = 7001;

app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({
        name: 'session',
        keys: ['clu'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});