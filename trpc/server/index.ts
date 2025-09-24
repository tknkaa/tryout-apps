import { publicProcedure, router } from "trpc";
import { PrismaClient } from "../generated/prisma/index";

const prisma = new PrismaClient()

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await prisma.user.findMany();
      return users
    })
})

export type AppRouter = typeof appRouter;

