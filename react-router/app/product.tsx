import type { Route } from "./+types/product";

export async function loader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.pid}`)
  const todo = await res.json();
  return todo
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const {title, completed} = loaderData;
  return (
    <div>
      <h1>{title}</h1>
      <p>{String(completed)}</p>
    </div>
  )
}
