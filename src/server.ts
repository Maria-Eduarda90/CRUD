import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contacts.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
  prefix: "/api/users",
});

app.register(contactsRoutes, {
  prefix: "/api/contacts",
});

const port = 3333;

app.listen(
  {
    port: port,
  },
  () => console.log(`Servidor rodando na porta ${port}`)
);
