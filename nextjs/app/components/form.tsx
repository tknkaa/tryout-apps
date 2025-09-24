"use client";

import { useActionState } from "react";
import type { State } from "../actions";
import { createUser } from "../actions";

export default function Form() {
  const initState: State = {};
  const [state, action, isPending] = useActionState(createUser, initState);
  return (
    <>
      <form action={action}>
        <input name="email" placeholder="email"></input>
        <input name="name" placeholder="name"></input>
        <button type="submit">create user</button>
      </form>
      {isPending && <div>creating user...</div>}
      {state.errorMessage && <div>Error: {state.errorMessage}</div>}
    </>
  );
}
