import { type FastifyInstance } from "fastify";
import { adaptFastifyRoute } from "../adapters/fastify-router";
import { makeCreateUserController } from "../factories/presentation/create-user.controller";

export async function userRouter(app: FastifyInstance): Promise<void> {
  app.post("/users", adaptFastifyRoute(makeCreateUserController()));
}
