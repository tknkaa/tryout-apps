import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index.ts";

const trpc = createTRPCClient<AppRouter>({
  // links are like middlewares?
  links: [
    httpBatchLink({
      url: "http://localhost:3000"
    })
  ]
})

async function main() {
  const users = await trpc.userList.query();
  console.log(users)
  const user = await trpc.userById.query(2);
  console.log(user)
  const createdUser = await trpc.userCreate.mutate({
    name: "Tanaka",
    email: "tanaka@example.com"
  });
  console.log(createdUser)
}

main()
