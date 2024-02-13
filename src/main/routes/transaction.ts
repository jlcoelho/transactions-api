import { type FastifyInstance } from "fastify";
import { makePerformTransactionController } from "../factories/presentation/perform-transaction.controller";
import { adaptFastifyRoute } from "../adapters/fastify-router";

export async function transactionRouter(app: FastifyInstance): Promise<void> {
  app.post(
    "/transaction",
    adaptFastifyRoute(makePerformTransactionController()),
  );
}
