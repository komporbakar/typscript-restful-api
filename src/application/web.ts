import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";
import { publicRouter } from "../route/public-api";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);

// web.listen(3001, () => {
//   console.log("Server is running on port 3000");
// });
