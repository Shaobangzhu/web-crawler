import express, { Request, Response, NextFunction } from 'express';
import router from "./router";

const app = express();
const port = 7001;

app.use(express.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next:NextFunction) => {
    req.teacherName = 'clu';
    next();
});
app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});