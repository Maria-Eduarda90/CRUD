import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify();

const port = 3333;

app.listen(
  {
    port: port,
  },
  () => console.log(`Servidor rodando na porta ${port}`)
);
