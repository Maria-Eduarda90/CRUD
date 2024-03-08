import { FastifyInstance } from "fastify";
import { ContactsUseCase } from "../usecases/contacts.usecase";
import { ContactsCreate } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactsRoutes(fastify: FastifyInstance) {
  const usecase = new ContactsUseCase();

  try {
    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: ContactsCreate; Params: { userId: string } }>(
      "/create",
      async (request, reply) => {
        const { name, email, phone } = request.body;
        const userId = request.params.userId;
        try {
          const data = await usecase.create({
            name,
            email,
            phone,
            userId: userId,
          });
          return reply.status(201).send(data);
        } catch (err) {
          reply.status(400).send(err);
        }
      }
    );
    fastify.get<{ Params: { userId: string } }>(
      "/list",
      async (request, reply) => {
        const userId = request.params.userId;
        try {
          const data = await usecase.listAllContacts(userId);
          return reply.status(201).send(data);
        } catch (err) {
          reply.send(err);
        }
      }
    );

    fastify.put<{ Body: ContactsCreate; Params: { id: string } }>(
      "/update/:id",
      async (request, reply) => {
        const { id } = request.params;
        const { name, email, phone } = request.body;
        try {
          const data = await usecase.updateContact({ id, name, email, phone });
          return reply.status(200).send(data);
        } catch (err) {
          reply.send(err);
        }
      }
    );

    fastify.delete<{ Params: { id: string } }>(
      "/delete/:id",
      async (request, reply) => {
        const { id } = request.params;
        try {
          const data = await usecase.deleteContact(id);
          return reply.status(200).send(data);
        } catch (err: any) {
          if (err.code === "P2025") {
            reply.status(400).send({ message: "Contato não existe" });
          }
          throw err;
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}
