import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx")
  ]),
  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx")
  ])
] satisfies RouteConfig;
