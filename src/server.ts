import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
  prefix: "/api/users",
});

const port = 3333;

app.listen(
  {
    port: port,
  },
  () => console.log(`Servidor rodando na porta ${port}`)
);
