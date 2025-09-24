import { db } from "./db";
import { user } from "./db/schema";

export default async function Home() {
  const users = await db.select().from(user);
  return (
    <>
      <table>
        <caption>User List</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
