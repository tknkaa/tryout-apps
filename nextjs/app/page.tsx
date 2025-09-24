import Form from "./components/form";
import UserList from "./components/UserList";

export default async function Home() {
  return (
    <>
      <UserList />
      <Form />
    </>
  );
}
