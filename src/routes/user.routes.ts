import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const usecase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/create", async (request, reply) => {
    const { name, email, password } = request.body;
    try {
      const data = await usecase.create({
        name,
        email,
        password,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
