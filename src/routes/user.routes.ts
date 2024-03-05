import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate, UserLogin } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userCreated = new UserUseCase();
  const userLogin = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/create", async (request, reply) => {
    const { name, email, password } = request.body;
    try {
      const data = await userCreated.create({
        name,
        email,
        password,
      });
      return reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.post<{ Body: UserLogin }>("/login", async (request, reply) => {
    const { email, password } = request.body;
    try {
      const data = await userLogin.login({
        email,
        password,
      });
      return reply.status(200).send({ data });
    } catch (error) {
      reply.send(error);
    }
  });
}
