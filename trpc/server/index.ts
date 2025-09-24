import { publicProcedure, router } from "./trpc.ts";
import { PrismaClient } from "../generated/prisma/index.js";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const prisma = new PrismaClient()

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await prisma.user.findMany();
      return users
    }),
  userById: publicProcedure
    .input(z.number())
    .query(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.findUnique({
        where: {
          id: input
        },
      });
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({
      email: z.email(),
      name: z.string()
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        }
      })
      return user
    })
})

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter
});

server.listen(3000)
