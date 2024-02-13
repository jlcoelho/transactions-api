import { type Controller } from "@/presentation/controllers/controller";
import {
  type FastifyRequest,
  type FastifyReply,
  type RouteHandlerMethod,
} from "fastify";

type Adapter = (controller: Controller) => RouteHandlerMethod;

export const adaptFastifyRoute: Adapter =
  (controller) => async (request: FastifyRequest, reply: FastifyReply) => {
    const requestBody = request.body as Record<string, any>;
    const { statusCode, data } = await controller.handle({ ...requestBody });
    const responsePayload = [200, 204].includes(statusCode)
      ? data
      : {
          error: data.message,
          ...(data.error !== null && {
            errors: data.error,
          }),
        };
    await reply.status(statusCode).send(responsePayload);
  };
