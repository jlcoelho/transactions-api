/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from "fastify";
import { userRouter } from "../routes/user";
import { transactionRouter } from "../routes/transaction";

export const app = fastify();

app.register(userRouter);
app.register(transactionRouter);
