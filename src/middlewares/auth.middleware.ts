import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export function authMiddleware(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply,
  next: (err?: Error) => void
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return reply.status(401).send({
      message: "Sessão invalida",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Ipayload;
    request.params.userId = sub;

    return next();
  } catch (err) {
    return reply.status(401).send({
      message: "Token invalido",
    });
  }
}
